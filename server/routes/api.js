const express = require('express')
const { Order, Storedorder, User, Storegeo, genHash } = require('../models/db')
const { customerEmail, factoryEmail, agentEmail } = require('../utils/sendmail')
const { createPdfBinary } = require('../utils/createPdf')
const { assembleCsv } = require('../utils/createCsv')

const router = new express.Router()

router.post('/order', (req, res) => {
  // If no additional info entered, take default address.
  req.body.addinfo.deliveryAddress = req.body.addinfo.deliveryAddress || req.body.customer.name

  User.find({where: {
    customerid: req.body.customer.customerid
  }})
  .then(user => {
    Order.create({
      order: req.body.order,
      userId: user.id,
      totalprice: req.body.totalPrice,
      totalamt: req.body.totalAmt,
      addinfo: req.body.addinfo,
      shipping: req.body.shipping
    })
      .then(order => {
        customerEmail(order, req.body.customer.email)
          .then(info => {
            console.log('Customer Message %s sent: %s', info.messageId, info.response)
            return createPdfBinary(order, req.body.customer, req.body.totalAmt, req.body.agent)
          })
          .then(pdf => {
            console.log('pdf created')
            if (req.body.agent) {
              return factoryEmail(order, req.body.customer, req.body.totalAmt, req.body.agent, pdf)
            } else {
              return factoryEmail(order, req.body.customer, req.body.totalAmt, null, pdf)
            }
          })
          .then(info => {
            console.log('Factory Message %s sent: %s', info.messageId, info.response)
            if (req.body.agent) {
              agentEmail(order, req.body.customer, req.body.agent.email)
                .then(info => {
                  console.log('Agent Message %s sent: %s', info.messageId, info.response)
                })
            }
          })
          .catch(error => {
            console.log('Sendmail error:', error)
          })
        res.json({
          message: 'Order received, thank you for your business. A copy of this order has been emailed to you.',
          order: order
        })
      })
      .catch(err => {
        console.log('order failed in writing to db:', err)
        res.status(500).json({
          message: `Failed to save order: ${err}`
        })
      })
  })
})

router.get('/order', (req, res) => {
  // Manage query for individual user or admin.
  let query = req.headers.id ? {customerid: req.headers.id} : {}
  Order.findAll({
    limit: 12,
    // where: query,
    order: [[ 'createdAt', 'DESC' ]],
    include: [ {
      model: User,
      required: true,
      where: query
    } ]
  })
    .then(orders => {
      res.json(orders)
    })
    .catch(err => {
      console.log('order findall err', err)
      res.status(500).json({
        message: `Failed to get orders: ${err}`
      })
    })
})

router.post('/order-form', (req, res) => {
  Storedorder.sync({force: true})
  .then(() => {
    return Storedorder.create({storedorder: req.body})
  })
  .then(orderForm => {
    res.status(200).json(orderForm)
  })
  .catch(err => {
    if (err) {
      console.log('upload order form db error:', err)
      res.status(500).json(err)
    }
  })
})

router.get('/order-form', (req, res) => {
  Storedorder.findOne()
  .then(orderForm => {
    res.status(200).json(orderForm)
  })
  .catch(err => {
    if (err) {
      console.log('upload order form db error:', err)
      res.status(500).json(err)
    }
  })
})

router.post('/store-geo', (req, res) => {
  Storegeo.sync({force: true}).then(r => {
    let dbCreates = req.body.map(s => {
      return Storegeo.create({
        name: s.name,
        address: `${s.name}, ${s.street}, ${s.suburb}, ${s.state}, ${s.postcode}`,
        comment: s.comment,
        location: {type: 'Point', coordinates: [s.lng, s.lat]}
      })
    })
    Promise.all(dbCreates)
      .then(dbList => {
        console.log('dbList promise response is:', dbList)
        res.status(200).json({
          message: 'Geolocation upload successful',
          dbList
        })
      })
      .catch(err => {
        console.log('dbCreate promise error:', err)
        res.status(500).json({
          message: 'Geolocation upload failure',
          err
        })
      })
  })
})

// router.get('/store-geo', (req, res) => {
//   let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${req.headers.search}&components=country:AU&region=au&key=${config.GMAPS_API}`
//   let searchPoint = {
//   }
//   axios.request(url)
//     .then(geo => {
//       console.log('\n***\nGeo Received from Google for address centering:\n', geo.data, 'latlng:', geo.data.results[0].geometry.location)
//       searchPoint = geo.data.results[0].geometry.location
//       const query = `SELECT
//       "name", "address", "location", ST_Distance_Sphere(ST_MakePoint(:longitude, :latitude), "location") AS distance
//       FROM "storegeos"
//       WHERE
//       ST_Distance_Sphere(ST_MakePoint(:longitude, :latitude), "location") < :maxDistance
//       ORDER BY distance ASC
//       LIMIT 25`
//       Storegeo.sequelize.query(query, {
//         replacements: {
//           latitude: searchPoint.lat,
//           longitude: searchPoint.lng,
//           maxDistance: 50 * 1000
//         },
//         type: Storegeo.sequelize.QueryTypes.SELECT
//       })
//       .then(geo => {
//         // console.log('\n\nWe got a response from store geo!\n', geo)
//         res.status(200).json({geo, searchPoint})
//       })
//       .catch(err => {
//         console.log('\n\nerror from store geo:\n', err)
//       })
//     })
// })

router.post('/customers', (req, res) => {
  let error
  for (let i = 0; i < req.body.length; i++) {
    let c = req.body[i]
    c.password = genHash(c.password)
    if (c.customerid.length === 0) continue
    User.upsert(c)
      .then(result => {
        // console.log('\n********\nupsert result:', result, '\n********\n')
      })
      .catch(err => {
        // console.log('\n********\nupsert err:', err, '\n********\n')
        if (err) {
          error = err
        }
      })
  }
  if (error) {
    res.status(500).json({
      message: error
    })
  } else {
    res.status(200).json({
      message: 'Customer List Updated.'
    })
  }
})

router.get('/customers', (req, res) => {
  let query = {}
  if (req.headers.query) {
    if (/[A-Za-z]{3}\d{3}/.test(req.headers.query)) {
      query = {customerid: req.headers.query.toUpperCase()}
    } else if (/@/g.test(req.headers.query)) {
      query = {email: {$ilike: req.headers.query}}
    } else {
      query = {name: {$ilike: '%' + req.headers.query + '%'}}
    }
  }
  User.findAll({
    where: query,
    order: [[ 'customerid', 'ASC' ]]
  })
    .then(users => {
      // console.log('\n\n************\nUser result:', user)
      users ? res.status(200).json(users) : res.status(500).json({msg: 'user not found'})
    })
    .catch(err => {
      res.status(500).json({err})
    })
})

router.post('/customer', (req, res) => {
  let adjustment = {}
  if (req.headers.type === 'agent') {
    adjustment = {agent: !req.body.agent}
  } else if (req.headers.type === 'admin') {
    adjustment = {admin: !req.body.admin}
  }
  User.update(
    adjustment,
    {where: {customerid: req.body.customerid},
      returning: true,
      plain: true}
  )
    .then(user => {
      // console.log('\n\ncustoemr updated?', user)
      res.status(200).json({user})
    })
    .catch(err => {
      // console.log('\n\nerror in customer update:', err)
      if (err) res.status(500).json({err})
    })
})

router.post('/csv', (req, res) => {
  const query = {
    createdAt: {
      $between: [req.body.start, req.body.end]
    }
  }
  Order.findAll({
    where: query,
    order: [[ 'createdAt', 'ASC' ]],
    include: [ {
      model: User,
      required: true
    } ]
  })
  .then(orders => {
    let file = assembleCsv(orders)

    res.setHeader('Content-disposition', `attachment; filename=Orders.csv`)
    res.set('Content-Type', 'text/csv')
    res.status(200).send(file)
  })
  .catch(err => {
    console.log('csv query error:', err)
    res.status(500).json(err)
  })
})

module.exports = router
