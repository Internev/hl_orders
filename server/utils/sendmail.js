const nodemailer = require('nodemailer')
const config = require('../../config')
const React = require('react')
const PdfPrinter = require('pdfmake/src/printer')
const path = require('path')
import { renderToString } from 'react-dom/server'
// require('babel-core/register')({
//   presets: ['es2015', 'react']
// })
import ConfirmSock from '../../client/components/ConfirmSock'

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport(config.mail)

const padToFive = number => number <= 99999 ? ('0000' + number).slice(-5) : number

const customerEmail = (order, email) => {
  if (!email) return Promise.resolve({messageId: 0, response: 'no email address provided.'})
  let html = '<div>This email confirms your sock order with Humphrey Law, you ordered:</div>'
  html += htmlFromOrder(order)
  html += `<div>Thank you for your business!</div>`

  let mailOptions = {
    from: '"Humphrey Law Orders" <orders@humphreylaw.com.au>',
    html,
    to: email,
    subject: 'Humphrey Law Order Confirmation'
  }
  return transporter.sendMail(mailOptions)
}

const agentEmail = (order, customer, email) => {
  let html = `<div>This confirms the sock order you made with Humphrey Law on behalf of customer ${customer.customerid}, you ordered:</div>`
  html += htmlFromOrder(order)
  html += `<div>Thanks!</div>`

  let mailOptions = {
    from: '"Humphrey Law Orders" <orders@humphreylaw.com.au>',
    html,
    to: email,
    subject: `${customer.customerid} Humphrey Law Order Confirmation`
  }
  return transporter.sendMail(mailOptions)
}

const factoryEmail = (order, customer, totalAmt, agent, pdf) => {
  let webOrderNumber = 'A' + padToFive(order.id)
  let html = `<div style="font-size:9pt; font-family:sans-serif">`
  if (agent) {
    html += `<div>Agent ${agent.customerid} has made an order on behalf of ${customer.customerid}, order number: ${webOrderNumber}.<br/></div>`
  } else {
    html += `<div>A new customer order has been made, order number: ${webOrderNumber}.<br /><br /></div>`
  }
  html += `<br/>Humphrey Law Order Number: ${webOrderNumber}`
  html += `<div><br/><b>Total Price: $${(order.totalprice / 100).toFixed(2)}</b></div>`
  html += `<div><br/><b>Total Qty: ${order.totalamt}</b></div>`
  html += `<div><br /><b>Shipping to:</b></div>`
  order.addinfo.deliveryAddress.split(/[,\n]/g)
    .map(line => `<div>${line}</div>`)
    .forEach(line => { html += line })
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
  html += '<div>The order is:<br /></div>'
  html += htmlFromOrder(order)
  html += `<div><br />A CSV of this order is attached to this email.<br /></div>`
  html += '</div>'
  let mailOptions = {
    from: '"Humphrey Law Orders" <orders@humphreylaw.com.au>'
  }
  mailOptions.subject = `Humphrey Law Order Confirmation, order no ${webOrderNumber}`
  mailOptions.html = html
  mailOptions.to = config.factoryEmail
  mailOptions.attachments = [
    {
      filename: `${customer.customerid} Order ${webOrderNumber}.csv`,
      content: csvFromOrder(order, customer, totalAmt, agent)
    },
    {
      filename: `${customer.customerid} Order ${webOrderNumber}.pdf`,
      content: pdf,
      contentType: 'application/pdf',
      encoding: 'base64'
    }
  ]
  return transporter.sendMail(mailOptions)
}

const csvFromOrder = (order, customer, totalAmt, agent) => {
  // Handle no-postcode field uploads.
  if (customer.name.split('').filter(ch => ch === ',').length === 3) {
    customer.name = customer.name + ','
  }

  // filter by sock, then also by size before outputting to csv.
  let csv = `Date Ordered, Style Number, Pattern, Colour/Pattern, Quantity, Unit Price, Line Total, Order Total, Shipping Costs, Order Grand Total, Total Pair, Store Name, Store Address 1, Store Address 2, Store Address 3, Store Address 4, Customer Name, Delivery Address, Customer Code, Web Order Number, Delivery Instructions, Department, Reference Number, Contact Person, Email Address, Comments, Agent Order\n`
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
            csv += `${orderDate}, ${size}, ${colour.patternID}, ${colour.colourID}, ${colour[size]}, ${sock.price}, ${colour[size] * sock.price}, ${order.totalprice / 100}, ${order.shipping}, ${(order.totalprice / 100) + order.shipping}, ${totalAmt}, ${customer.name}, ${clean(order.addinfo.customerName)}, ${clean(order.addinfo.deliveryAddress)}, ${customer.customerid}, ${webOrderNumber}, ${clean(order.addinfo.deliveryInstructions)}, ${clean(order.addinfo.department)}, ${clean(order.addinfo.customerRef)}, ${clean(order.addinfo.contactPerson)}, ${clean(order.addinfo.email)}, ${clean(order.addinfo.comments)}, ${agent ? agent.customerid : ''}\n`
          }
        })
      })
    })
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
  order.addinfo.deliveryAddress.split(/[,\n]/g)
    .map(line => `<div>${line}</div>`)
    .forEach(line => { html += line })
  return html
}

function createPdfBinary (text) {
  const fontDescriptors = {
    Roboto: {
      normal: path.join(__dirname, '/fonts/Roboto-Regular.ttf'),
      bold: path.join(__dirname, '/fonts/Roboto-Medium.ttf'),
      italics: path.join(__dirname, '/fonts/Roboto-Italic.ttf'),
      bolditalics: path.join(__dirname, '/fonts/Roboto-MediumItalic.ttf')
    }
  }
  const printer = new PdfPrinter(fontDescriptors)
  let doc = printer.createPdfKitDocument(text)

  let chunks = []
  let result

  return new Promise((resolve, reject) => {
    doc.on('data', chunk => {
      chunks.push(chunk)
    })
    doc.on('end', () => {
      result = Buffer.concat(chunks)
      resolve(result.toString('base64'))
    })
    doc.end()
  })
}

module.exports.customerEmail = customerEmail
module.exports.factoryEmail = factoryEmail
module.exports.agentEmail = agentEmail
module.exports.createPdfBinary = createPdfBinary
