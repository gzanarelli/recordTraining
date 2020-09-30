'use strict'

const Boom = require('@hapi/boom')
const { validationResult } = require('express-validator')

module.exports = (req, res, next) => {
  const errors = validationResult(req)
  console.log(req)
  console.log('Errors: ', errors)
  if (!errors.isEmpty()) {
    return next(Boom.badRequest(null, errors.array()))
  }

  return next()
}
