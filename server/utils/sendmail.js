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
  to: 'nchallinger@gmail.com', // list of receivers
  subject: 'Humphrey Law Order Confirmation', // Subject line
  text: 'Humphrey Law Order Confirmation', // plain text body
  html: '<b>Humphrey Law Order Confirmation</b>', // html body
  attachments: [
    {
      filename: 'text1.txt',
      content: 'I am attached text document!'
    }
  ]
}

const sendmail = (order) => {
  let html = '<div>This email confirms your sock order with Humphrey Law, you ordered:</div>'
  // console.log(Array.isArray(order.order))
  order.order
    .filter(sock => sock.totalAmt)
    .forEach(sock => (
      html += renderToString(<ConfirmSock sock={sock} key={sock.styleID} />)
    ))
  html += `<div>Shipping to:</div>`
  order.address.split(',')
    .map(line => `<div>${line}</div>`)
    .forEach(line => { html += line })
  html += `<div>Thank you for your business!</div>`
  mailOptions.html = html

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }
    console.log('Message %s sent: %s', info.messageId, info.response)
  })
  return '250'
}

module.exports.sendmail = sendmail
