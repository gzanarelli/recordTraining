'use strict'

const Boom = require('@hapi/boom')
const { validationResult } = require('express-validator')
const _ = require('lodash')

module.exports = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    if (_.filter(errors, err => err.location === 'headers').length > 0) {
      return next(Boom.unauthorized(null, errors.array()))
    }
    return next(Boom.badRequest(null, errors.array()))
  }

  return next()
}
