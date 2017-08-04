const jwt = require('jsonwebtoken')
// const User = require('mongoose').model('User')
const PassportLocalStrategy = require('passport-local').Strategy
const config = require('../../config')
const { User, validPass } = require('../models/db')

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim()
  }

  User.findOne({where: {email: userData.email}})
    .then(user => {
      if (!user) {
        const error = new Error('Incorrect email or password')
        error.name = 'IncorrectCredentialsError'

        return done(error)
      }

      if (!validPass(userData.password, user.password)) {
        const error = new Error('Incorrect email or password')
        error.name = 'IncorrectCredentialsError'

        return done(error)
      } else {
        const payload = {
          sub: user.id
        }

        // create a token string
        const token = jwt.sign(payload, config.jwtSecret)
        // const data = {
        //   name: user.name,
        //   id: user.id,
        //   email: user.email,
        //   admin: user.admin
        // }

        return done(null, token, user)
      }
    })
    .catch(err => {
      return done(err)
    })
})
