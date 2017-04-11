const jwt = require('jsonwebtoken')
// const User = require('mongoose').model('User')
const { User, validPass } = require('../models/db')
const config = require('../../config')

/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
  // console.log('auth checker, headers:', req.headers)
  if (!req.headers.authorization) {
    console.log('\n\nauth not found in headers, headers:', req.headers)
    return res.status(401).end()
  }

  const token = req.headers.authorization

  // decode the token using a secret key-phrase
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) {
      return res.status(401).end()
    }
    const userId = decoded.sub

    // check if a user exists
    User.findById(userId)
    .then(user => {
      if (user) {
        return next()
      }

      return res.status(401).end()
    })
  })
}
