const nodemailer = require('nodemailer')
const config = require('../../config')
const React = require('react')
import { renderToString } from 'react-dom/server'
// require('babel-core/register')({
//   presets: ['es2015', 'react']
// })
import ConfirmSock from '../../client/components/ConfirmSock'

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport(config.mail)
// setup email data with unicode symbols
let mailOptions = {
  from: '"Humphrey Law Orders" <orders@humphreylaw.com.au>', // sender address
  subject: 'Humphrey Law Order Confirmation', // Subject line
  text: 'Humphrey Law Order Confirmation', // plain text body
  html: '<b>Humphrey Law Order Confirmation</b>' // html body
}

const customerEmail = (order, email) => {
  let html = '<div>This email confirms your sock order with Humphrey Law, you ordered:</div>'
  // console.log(Array.isArray(order.order))
  html += htmlFromOrder(order)
  html += `<div>Thank you for your business!</div>`

  mailOptions.html = html
  mailOptions.to = email

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }
    console.log('Message %s sent: %s', info.messageId, info.response)
  })
  return '250'
}

const factoryEmail = (order, customerid) => {
  let html = '<div>A new customer order has been made, the order is:</div>'
  // console.log(Array.isArray(order.order))
  html += htmlFromOrder(order)
  html += `<div>A CSV of this order is attached to this email.</div>`

  mailOptions.html = html
  mailOptions.to = config.factoryEmail
  mailOptions.attachments = [
    {
      filename: `${customerid} Order.csv`,
      content: csvFromOrder(order, customerid)
    }
  ]
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }
    console.log('Message %s sent: %s', info.messageId, info.response)
  })
  return '250'
}

const csvFromOrder = (order, customerid) => {
  let csv = ''
  order.order
    .filter(sock => sock.totalAmt)
    .forEach(sock => {
      csv += `StyleID, ColourID, PatternID, `
      sock.sizes.forEach(size => {
        csv += `${size}, `
      })
      csv += `Price, Total\n`
      sock.colours
      .filter(colour => {
        return sock.sizes.some(size => {
          if (colour.hasOwnProperty(size)) {
            return colour[size] > 0
          }
          return false
        })
      })
      .forEach(colour => {
        csv += `${sock.styleID}, ${colour.colourID}, ${colour.patternID}, `
        sock.sizes.forEach(size => {
          if (colour.hasOwnProperty(size)) {
            csv += `${colour[size]}, `
          }
        })
        csv += `${sock.price.toFixed(2)}, ${(
          sock.sizes.reduce((memo, size) => {
            if (colour.hasOwnProperty(size)) memo += colour[size]
            return memo
          }, 0) * sock.price).toFixed(2)}\n`
      })
    })
  csv += `Total Price:, ${order.totalPrice / 100}\n\n`
  csv += `CustomerID:, ${customerid}\nShipping Address:\n${order.address}\n`
  return csv
}

const htmlFromOrder = (order) => {
  let html = ''
  order.order
    .filter(sock => sock.totalAmt)
    .forEach(sock => {
      html += renderToString(<ConfirmSock sock={sock} key={sock.styleID} />)
    })
  html += `<div>Shipping to:</div>`
  order.address.split(',')
    .map(line => `<div>${line}</div>`)
    .forEach(line => { html += line })
  return html
}

module.exports.customerEmail = customerEmail
module.exports.factoryEmail = factoryEmail
