const express = require('express')
const { Order, storedOrder } = require('../models/db')

const router = new express.Router()
let counter = 0

router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: "You're authorized to see this secret message."
  })
})

router.post('/order', (req, res) => {
  console.log('dashboard POST for order')
  Order.create({order: JSON.stringify({orderNum: counter, text: 'Hello, I am text for this order.'})})
    .then(order => {
      console.log('we made an order: ', order)
      res.status(200).json({
        message: 'Order received, thank you.',
        order: order
      })
    })
    .catch(error => {
      console.log('Order DB Error!', error)
      res.status(500).json({
        message: `Failed to save order: ${error}`
      })
    })
  counter++
})

router.post('/order-form', (req, res) => {
  storedOrder.sync({force: true})
  .then(() => {
    return storedOrder.create({storedOrder: req.body})
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
  storedOrder.findOne()
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

module.exports = router
