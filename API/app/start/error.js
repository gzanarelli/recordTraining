'use strict'

const Boom = require('@hapi/boom')
const _ = require('lodash')
const log = require('debug')('Error catcher')

module.exports = (app) => {
  app.use((req, res, next) => {
    res.json(boom.notFound())
  })

  app.use((err, req, res, next) => {
    if (!Boom.isBoom(err)) {
      console.log('Not boom: ', err)
      Boom.boomify(err, {
        statusCode: err.statusCode || 500
      })
    }

    log(err)
    console.log(err)
    const statusCode = err.output.payload.statusCode
    const errorName = err.output.payload.error
    const message = err.output.payload.message

    const errorResponse = { error: errorName, message: message }
    if (err.data) {
      errorResponse.data = err.data
    }
    console.log('errorResponse: ', errorResponse)
    res.status(statusCode).json(errorResponse)
  })
}
