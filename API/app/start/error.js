'use strict'

const boom = require('@hapi/boom')
const _ = require('lodash')

module.exports = (app) => {
  app.use((req, res, next) => {
    res.json(boom.notFound())
  })

  app.use((err, req, res, next) => {
    const error = boom.boomify(err)
    res.json(error)
  })
}
