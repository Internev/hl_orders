const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')

let port = process.env.PORT || 3000

const app = express()
// tell the app to look for static files in these directories
app.use(express.static('../client/'))
app.use(express.static('./client/dist/'))
// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }))
// pass the passport middleware
app.use(passport.initialize())

// load passport strategies
const localSignupStrategy = require('./passport/local-signup')
const localLoginStrategy = require('./passport/local-login')
passport.use('local-signup', localSignupStrategy)
passport.use('local-login', localLoginStrategy)

// pass the authorization checker middleware
const authCheckMiddleware = require('./middleware/auth-check')
app.use('/api', authCheckMiddleware)

// routes
const authRoutes = require('./routes/auth')
const apiRoutes = require('./routes/api')
app.use('/auth', authRoutes)
app.use('/api', apiRoutes)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client', 'index.html'))
})

// start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
