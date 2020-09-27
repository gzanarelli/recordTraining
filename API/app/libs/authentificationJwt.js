'use strict'

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Promise = require('bluebird')

const _jwt = Promise.promisifyAll(jwt)

/**
 * Verification user's token with
 * an algorithm RS256 and
 * a lifetime for token: 2h
 * and for refresh token: 3d
 */
const verify = (token, publicKey) => {
  _jwt.verify(
    token,
    publicKey
  )
    .then(decoded => {
      return decoded
    })
    .catch(err => { return err })
}

const sign = (payload, privateKey, expireIn) => {
  _jwt.sign({
    payload
  }, privateKey, {
    algorithm: process.env.JWT_ALGORITHM,
    expireIn
  })
    .then(token => {
      return token
    })
    .catch(err => { return err })
}

module.exports = { sign, verify }
