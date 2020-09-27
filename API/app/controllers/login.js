'use strict'

const validator = require('../validators/login')
const router = require('express').Router()
const authentification = require('../libs/authentificationJwt')
const _ = require('lodash')

module.exports = (app) => {
  app.use('/', router)
}

router.post(
  '/login',
  validator.LOGIN,
  (req, res, next) => {
    // Add verification email and password exist and match
    authentification.sign(
      _.get(req, 'body.email',null),
      process.env.JWT_PRIVATE,
      process.env.EXPIRE_TOKEN
    ).then(token => {
      console.log(token)
      return res.json({ token })
    })
})

router.post(
  '/sign-up', 
  validator.SIGNUP,
  (req, res, next) => {
  return res.json({ status: 'Hello World' })
})
