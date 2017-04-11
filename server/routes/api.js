const express = require('express')
const { Order } = require('../models/db')

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

router.post('/update-order-form', (req, res) => {
  console.log('update order form, reqbody:', req.body)
  res.status(200)
})

module.exports = router
