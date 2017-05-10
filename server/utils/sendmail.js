const nodemailer = require('nodemailer')
const config = require('../../config')

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport(config.mail)
// setup email data with unicode symbols
let mailOptions = {
  from: '"Humphrey Law Orders" <orders@humphreylaw.com.au>', // sender address
  to: 'nchallinger@gmail.com', // list of receivers
  subject: 'Hello ✔', // Subject line
  text: 'Hello world ?', // plain text body
  html: '<b>Hello world ?</b>', // html body
  attachments: [
    {
      filename: 'text1.txt',
      content: 'I am attached text document!'
    }
  ]
}

const sendmail = (order) => {
  console.log(order)
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
