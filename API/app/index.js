'use strict'

const express = require('express')
const app = express()
const debug = require('debug')('recordWorkout:index')
const glob = require('glob')
const path = require('path')

/**
 * Middleware initialization
 */
require('./start/init')(app)

/**
 * Connect mongo DB
 */
require('./libs/connect')

app.get('/', (req, res, next) => {
  res.json({ home: 'Welcome to the home page' })
})

/**
 * All controllers set
 */
glob
  .sync(path.join(__dirname, 'controllers/*.js'))
  .map(function (controller) {
    debug('Controller %s require', controller)
    require(controller)(app)
  })

/**
 * Errors handler
 */
require('./start/error')(app)

app.listen(process.env.PORT, () => {
  console.log('listen on port ' + process.env.PORT)
})
