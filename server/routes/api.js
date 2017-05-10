const express = require('express')
const { Order, storedOrder } = require('../models/db')
const {sendmail} = require('../utils/sendmail')

const router = new express.Router()

// router.get('/dashboard', (req, res) => {
//   res.status(200).json({
//     message: "You're authorized to see this secret message."
//   })
// })

router.post('/order', (req, res) => {
  console.log('dashboard POST for order, requestbody:', req.body)
  Order.create({
    order: req.body.order,
    userId: req.body.userId,
    totalPrice: req.body.totalPrice
  })
    .then(order => {
      console.log('order written to db:', order)
      sendmail(order)
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
  storedOrder.sync({force: true})
  .then(() => {
    return storedOrder.create({storedOrder: req.body})
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
