const express = require('express')
const { Order, Storedorder, User, Storegeo, genHash } = require('../models/db')
const { customerEmail, factoryEmail, agentEmail } = require('../utils/sendmail')
const axios = require('axios')
const PromiseThrottle = require('promise-throttle')
const config = require('../../config')

const router = new express.Router()

router.post('/order', (req, res) => {
  // If no additional info entered, take default address.
  req.body.addinfo.deliveryAddress = req.body.addinfo.deliveryAddress || req.body.customer.name

  Order.create({
    order: req.body.order,
    userId: req.body.customer.id,
    totalprice: req.body.totalPrice,
    totalamt: req.body.totalAmt,
    addinfo: req.body.addinfo,
    shipping: req.body.shipping
  })
    .then(order => {
      customerEmail(order, req.body.customer.email)
        .then(info => {
          console.log('Customer Message %s sent: %s', info.messageId, info.response)
          if (req.body.agent) return factoryEmail(order, req.body.customer, req.body.totalAmt, req.body.agent)
          else return factoryEmail(order, req.body.customer, req.body.totalAmt)
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
      // factoryEmail(order, req.body.customer, req.body.totalAmt)
      // if (req.body.agent) setTimeout(agentEmail(order, req.body.customer, req.body.agent.email), 5000)
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

router.get('/order', (req, res) => {
  // Manage query for individual user or admin.
  let query = req.headers.id ? {userId: req.headers.id} : {}
  Order.findAll({
    limit: 12,
    where: query,
    order: [[ 'createdAt', 'DESC' ]],
    include: [ {model: User, required: true} ]
  })
    .then(orders => {
      // console.log('\n\n\n\nres from findall limit 10', orders, '\n\n\n\n')
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
  // console.log('order form upload, reqbody:', req.body)
  Storedorder.sync({force: true})
  .then(() => {
    return Storedorder.create({storedorder: req.body})
  })
  .then(orderForm => {
    console.log('\n\norder form uploaded\n\n', orderForm)
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
    console.log('\n\n\norder form received.', orderForm)
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
  // console.log('\n\n*********\nStore Geo:', req.body)
  Storegeo.sync({force: true})
  // let request = limit(axios.request).to(50).per(1000)
  let pThrottle = new PromiseThrottle({
    requestsPerSecond: 50,
    promiseImplementation: Promise
  })
  let geoRequests = []
  let storeNames = []
  // req.body = req.body.slice(100, 200)
  req.body.forEach(c => {
    if (c.name) {
      let query = `${c.name.trim()},${c.street},${c.suburb},${c.state}`.replace(/[ \t]/g, '+')
      let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&region=au&key=${config.GMAPS_API}`
      storeNames.push({
        name: c.name.trim(),
        address: `${c.street},${c.suburb},${c.state}`
      })
      geoRequests.push(pThrottle.add(axios.request.bind(this, url)))
    }
  })

  let geoResults = []
  let geoFailures = []
  Promise.all(geoRequests)
    .then(resList => {
      resList.forEach((res, i) => {
        console.log('res:', res.data.results)
        if (res.data.status === 'OK') {
          let geo = res.data.results[0]
          let point = {type: 'Point', coordinates: [geo.geometry.location.lng, geo.geometry.location.lat]}
          geoResults.push(Storegeo.create({
            name: storeNames[i].name,
            address: geo.formatted_address,
            location: point
          }))
        } else {
          geoFailures.push({
            store: storeNames[i],
            status: res.data.status
          })
        }
      })
      Promise.all(geoResults)
        .then(dbList => {
          res.status(200).json({
            message: 'Store locations uploaded.',
            geoFailures
          })
        })
        .catch(err => {
          if (err) {
            console.log('geoResults error:', err)
            res.status(500).json({err})
          }
        })
    })
    .catch(err => {
      if (err) console.log('geoRequests error:', err)
    })
})

router.get('/store-geo', (req, res) => {
  const query = `SELECT
    "name", "address", "location", ST_Distance_Sphere(ST_MakePoint(:longitude, :latitude), "location") AS distance
    FROM "storegeos"
    WHERE
    ST_Distance_Sphere(ST_MakePoint(:longitude, :latitude), "location") < :maxDistance
    ORDER BY distance ASC
    LIMIT 25`
  Storegeo.sequelize.query(query, {
    replacements: {
      latitude: -37.813627,
      longitude: 144.963057,
      maxDistance: 50 * 1000
    },
    type: Storegeo.sequelize.QueryTypes.SELECT
  })
  .then(geo => {
    console.log('\n\nEe got a response from store geo!\n', geo)
    res.status(200).json(geo)
  })
  .catch(err => {
    console.log('\n\nerror from store geo:\n', err)
  })
})

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

module.exports = router
