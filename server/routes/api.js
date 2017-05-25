const express = require('express')
const { Order, Storedorder } = require('../models/db')
const { customerEmail, factoryEmail } = require('../utils/sendmail')
const axios = require('axios')
const config = require('../../config')
const { User, genHash } = require('../models/db')

const router = new express.Router()

router.post('/order', (req, res) => {
  console.log('dashboard POST for order, requestbody:', req.body)
  Order.create({
    order: req.body.order,
    userId: req.body.userId,
    totalPrice: req.body.totalPrice,
    address: req.body.addr
  })
    .then(order => {
      console.log('order written to db:', order)
      // customerEmail(order)
      factoryEmail(order, req.body.customerid)
      res.json({
        message: 'Order received, thank you.',
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

router.post('/order-form', (req, res) => {
  console.log('order form upload, reqbody:', req.body)
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
  console.log('\n\n*********\nStore Geo:', req.body)
  for (let i = 180; i < 190; i++) {
    let c = req.body[i]
    let query = `${c.name.trim()},${c.street},${c.suburb},${c.state}`.replace(/[ \t]/g, '+')
    console.log('queryString looks like:', query)
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=AIzaSyB_tnq4J0bWvyDk0EUJiXgSoabFi76QEV8`)
    .then(res => {
      console.log(`\n${query} response data:`, res.data)
    })
    .catch(err => {
      console.log('axios error:', err)
    })
  }
  res.status(200).json({
    message: 'Store locations uploaded, commencing geolocation.'
  })
})

router.post('/customers', (req, res) => {
  for (let i = 0; i < req.body.length; i++) {
    let c = req.body[i]
    c.password = genHash(c.password)
    if (c.customerid.length === 0) continue
    User.upsert(c)
      .then(result => {
        console.log('\n********\nupsert result:', result, '\n********\n')
        res.status(200).json({
          message: 'Customer List Updated.'
        })
      })
      .catch(err => {
        console.log('\n********\nupsert err:', err, '\n********\n')
        res.status(500).json({
          message: `Customer List Upload failed with error: ${err}`
        })
      })
  }
})

module.exports = router
