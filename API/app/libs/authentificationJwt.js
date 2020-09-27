'use strict'

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Promise = require('bluebird')

/**
 * Verification user's token with
 * an algorithm RS512 and
 * a lifetime for token: 2h
 * and for refresh token: 3d
 */
const verify = (token, publicKey) => {
  return new Promise((resolve, reject) => {
    return jwt.verify(
      token,
      publicKey,
      (err, decoded) => {
        if (err) { reject(err) }
        resolve(decoded)  
      })
  })
}

const sign = (payload, privateKey, expiresIn) => {
  return new Promise((resolve, reject) => {
    return jwt.sign({
      payload
    }, privateKey, {
      algorithm: process.env.JWT_ALGORITHM,
      expiresIn
    }, (err, token) => {
      if (err) { reject(err) }
      resolve(token)
    })
  }) 
}

module.exports = { sign, verify }
