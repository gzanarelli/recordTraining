'use strict'

const jwt = require('jsonwebtoken')
const Promise = require('bluebird')

/**
 * Verification user's token with
 * an algorithm RS512 and
 * a lifetime for token: 2h
 * and for refresh token: 3d
 */
const verify = (req, res, next) => {
  console.log(req.headers.token)
  console.log(process.env.JWT_PUB)
  return jwt.verify(
    req.headers.token,
    process.env.JWT_PUB,
    (err, decoded) => {
      console.log(err)
      console.log(decoded)
      if (err) { next(err) }
      req.decoded = decoded
      next()
    })
}

const sign = (payload, privateKey, expiresIn) => {
  return new Promise((resolve, reject) => {
    return jwt.sign({
      payload
    }, privateKey, {
      expiresIn
    }, (err, token) => {
      if (err) { reject(err) }
      resolve(token)
    })
  })
}

module.exports = { sign, verify }
