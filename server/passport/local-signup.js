// const User = require('mongoose').model('User')
const PassportLocalStrategy = require('passport-local').Strategy
const { User, genHash } = require('../models/db')

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
    password: genHash(password.trim()),
    name: req.body.name.trim()
  }

  User.findOrCreate({where: {email: userData.email}, defaults: {password: userData.password, name: userData.name}})
    .spread((user, created) => {
      if (!created) {
        return done({name: 'exists'}, null)
      } else {
        return done(null, user)
      }
    })
    .catch(err => {
      User.sync
      return done(err)
    })
})
