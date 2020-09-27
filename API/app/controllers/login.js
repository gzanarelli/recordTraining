'use strict'

const router = require('express').Router()

module.exports = (app) => {
  app.use('/', router)
}

router.post('/login', (req, res, next) => {
  return res.json({ status: 'Hello World' })
})

router.post('/sign-up', (req, res, next) => {
  return res.json({ status: 'Hello World' })
})
