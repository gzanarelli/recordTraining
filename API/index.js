'use strict'

const express = require('express')
const app = express()
const glob = require('glob')
const path = require('path')

/**
 * Middleware initialization
 */
require('./start/init')(app)

app.get('/', (req, res, next) => {
  res.json({ home: 'Welcome to the home page' })
})

/**
 * All controllers set
 */
glob
  .sync(path.join(__dirname, 'controllers/*.js'))
  .map(function (controller) {
    require(controller)(app)
  })

/**
 * Errors handler
 */
require('./start/error')(app)

app.listen(8181, () => {
  console.log('listen on port')
})
