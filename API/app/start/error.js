'use strict'

const boom = require('@hapi/boom')

module.exports = (app) => {
  app.use((req, res, next) => {
    res.json(boom.notFound())
  })

  app.use((err, req, res, next) => {
    res.json(boom.boomify(err))
  })
}
