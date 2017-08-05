const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')
const pdfPrinter = require('pdfmake/src/printer')


// var doc = { content: 'this is a pdf! Here is a newline\nIs this the second line?' }
// console.log(printer.createPdfKitDocument(doc))

// function createPdfBinary (text) {
//   const fontDescriptors = {
//     Roboto: {
//       normal: './server/utils/fonts/Roboto-Regular.ttf',
//       bold: './server/utils/fonts/Roboto-Medium.ttf',
//       italics: './server/utils/fonts/Roboto-Italic.ttf',
//       bolditalics: './server/utils/fonts/Roboto-MediumItalic.ttf'
//     }
//   }
//   const printer = new pdfPrinter(fontDescriptors)
//   let doc = printer.createPdfKitDocument(text)
//
//   let chunks = []
//   let result
//
//   return new Promise((resolve, reject) => {
//     doc.on('data', chunk => {
//       chunks.push(chunk)
//     })
//     doc.on('end', () => {
//       result = Buffer.concat(chunks)
//       resolve(result.toString('base64'))
//     })
//     doc.end()
//   })
// }

// createPdfBinary({content: 'line1\nline2'})
//   .then(pdf => {
//     console.log(`binary pdf:`, pdf)
//   })

let port = process.env.PORT || 3000

const app = express()
// tell the app to look for static files in these directories
app.use(express.static('./client/'))
app.use(express.static('./client/dist/'))
// tell the app to parse HTTP body messages
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit: '2mb', extended: true}))
// pass the passport middleware
app.use(passport.initialize())

// load passport strategies
const localSignupStrategy = require('./server/passport/local-signup')
const localLoginStrategy = require('./server/passport/local-login')
passport.use('local-signup', localSignupStrategy)
passport.use('local-login', localLoginStrategy)

// pass the authorization checker middleware
const authCheckMiddleware = require('./server/middleware/auth-check')
app.use('/api', authCheckMiddleware)

// routes
const authRoutes = require('./server/routes/auth')
const apiRoutes = require('./server/routes/api')
app.use('/auth', authRoutes)
app.use('/api', apiRoutes)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client', 'index.html'))
})

// start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
