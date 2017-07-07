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

const padToFive = number => number <= 99999 ? ('0000' + number).slice(-5) : number

const customerEmail = (order, email) => {
  let html = '<div>This email confirms your sock order with Humphrey Law, you ordered:</div>'
  // console.log(Array.isArray(order.order))
  html += htmlFromOrder(order)
  html += `<div>Thank you for your business!</div>`

  let mailOptions = {
    from: '"Humphrey Law Orders" <orders@humphreylaw.com.au>',
    html,
    to: email,
    subject: 'Humphrey Law Order Confirmation'
  }

  // mailOptions.html = html
  // mailOptions.to = email
  // mailOptions.subject = 'Humphrey Law Order Confirmation'

  return transporter.sendMail(mailOptions)
}

const agentEmail = (order, customer, email) => {
  let html = `<div>This confirms the sock order you made with Humphrey Law on behalf of customer ${customer.customerid}, you ordered:</div>`
  // console.log(Array.isArray(order.order))
  html += htmlFromOrder(order)
  html += `<div>Thanks!</div>`

  let mailOptions = {
    from: '"Humphrey Law Orders" <orders@humphreylaw.com.au>',
    html,
    to: email,
    subject: `${customer.customerid} Humphrey Law Order Confirmation`
  }
  // mailOptions.html = html
  // mailOptions.to = email
  // mailOptions.subject = `${customer.customerid} Humphrey Law Order Confirmation`

  return transporter.sendMail(mailOptions)
}

const factoryEmail = (order, customer, totalAmt) => {
  let webOrderNumber = 'A' + padToFive(order.id)
  let html = `<div>A new customer order has been made, order number: ${webOrderNumber}.<br /><br />The order is:</div>`
  // console.log(Array.isArray(order.order))
  html += htmlFromOrder(order)
  html += `<div><br /><b>Customer Details</b><br />
          ID: ${customer.customerid}<br />
          Customer: ${customer.name}<br />
          Email: ${customer.email}<br /></div>`
  if (Object.keys(order.addinfo).length) {
    html += `<div><br />Additional Information provided by customer:<br />`
    for (let info in order.addinfo) {
      html += `<b>${info}:</b> ${order.addinfo[info]}<br />`
    }
    html += `<br /></div>`
  }
  html += `<div><br />A CSV of this order is attached to this email.<br /></div>`

  let mailOptions = {
    from: '"Humphrey Law Orders" <orders@humphreylaw.com.au>'
  }
  mailOptions.subject = `Humphrey Law Order Confirmation, order no ${webOrderNumber}`
  mailOptions.html = html
  mailOptions.to = config.factoryEmail
  mailOptions.attachments = [
    {
      filename: `${customer.customerid} Order ${webOrderNumber}.csv`,
      content: csvFromOrder(order, customer, totalAmt)
    }
  ]
  return transporter.sendMail(mailOptions)
}

const csvFromOrder = (order, customer, totalAmt) => {
  // filter by sock, then also by size before outputting to csv.
  let csv = `Date Ordered, Style Number, Pattern, Colour/Pattern, Quantity, Unit Price, Line Total, Order Total, Shipping Costs, Order Grand Total, Total Pair, Store Name, Store Address 1, Store Address 2, Store Address 3, Store Address 4, Customer Name, Delivery Address, Customer Code, Web Order Number, Delivery Instructions, Department, Reference Number, Contact Person, Email Address, Comments\n`
  let day = order.updatedAt.getDate() < 10 ? '0' + order.updatedAt.getDate() : '' + order.updatedAt.getDate()
  let month = (order.updatedAt.getMonth() + 1) < 10 ? '0' + (order.updatedAt.getMonth() + 1) : '' + (order.updatedAt.getMonth() + 1)
  let orderDate = `${day}/${month}/${order.updatedAt.getFullYear()}`
  let webOrderNumber = 'A' + padToFive(order.id)
  const clean = (text) => {
    return text ? text.replace(/[,\n]/g, ' ') : ''
  }
  order.order
    .filter(sock => sock.totalAmt)
    .forEach(sock => {
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
        sock.sizes.forEach(size => {
          if (colour.hasOwnProperty(size) && colour[size] > 0) {
            csv += `${orderDate}, ${size}, ${colour.patternID}, ${colour.colourID}, ${colour[size]}, ${sock.price}, ${colour[size] * sock.price}, ${order.totalprice / 100}, ${order.shipping}, ${(order.totalprice / 100) + order.shipping}, ${totalAmt}, ${customer.name}, ${order.addinfo.customerName}, ${clean(order.addinfo.deliveryAddress)}, ${customer.customerid}, ${webOrderNumber}, ${clean(order.addinfo.deliveryInstructions)}, ${clean(order.addinfo.department)}, ${clean(order.addinfo.customerRef)}, ${clean(order.addinfo.contactPerson)}, ${clean(order.addinfo.email)}, ${clean(order.addinfo.comments)}\n`
          }
        })
      })
    })
  // csv += `Total Price:, ${order.totalprice / 100}\n\n`
  // csv += `CustomerID:, ${customer.customerid}\nShipping Address:\n${order.addinfo.deliveryAddress}\n`
  return csv
}

const htmlFromOrder = (order) => {
  let webOrderNumber = 'A' + padToFive(order.id)
  let html = ''
  order.order
    .filter(sock => sock.totalAmt)
    .forEach(sock => {
      html += renderToString(<ConfirmSock sock={sock} key={sock.styleID} />)
    })
  html += `<br/>Humphrey Law Order Number: ${webOrderNumber}`
  html += `<div><br/><b>Total Price: $${(order.totalprice / 100).toFixed(2)}</b></div>`
  html += `<div><br /><b>Shipping to:</b></div>`
  // console.log('order delivery', order.addinfo.deliveryAddress)
  order.addinfo.deliveryAddress.split(/[,\n]/g)
    .map(line => `<div>${line}</div>`)
    .forEach(line => { html += line })
  return html
}

module.exports.customerEmail = customerEmail
module.exports.factoryEmail = factoryEmail
module.exports.agentEmail = agentEmail
