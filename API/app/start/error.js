'use strict'

const boom = require('boom')

module.exports = (app) => {
  app.use((req, res, next) => {
    res.json(boom.notFound())
  })

  app.use((err, req, res, next) => {
    console.log('Error found')
    res.json(boom.boomify(err))
  })
}
