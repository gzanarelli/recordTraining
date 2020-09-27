'use strict'

const debug = require('debug')('recordWorkout:libs:connect')
const Promise = require('bluebird')
const mongoose = require('mongoose')
const glob = require('glob')
const path = require('path')

mongoose.Promise = Promise

/**
 * Get all models in /models/*.js
 */
glob.sync(path.join(__dirname, '../models/*.js')).map(function (modelPath) {
  debug('Require models %s', modelPath)
  require(modelPath)
})

const options = {
  useNewUrlParser: true,
  user: process.env.MONGODB_ADDON_USER,
  pass: process.env.MONGODB_ADDON_PASSWORD,
  useUnifiedTopology: true
}

if (process.env.NODE_ENV === 'development') {
  options.authSource = 'admin'
}

function connect () {
  return new Promise((resolve, reject) => {
    debug(
      'Connect to %s with user %s',
      process.env.MONGODB_ADDON_URI,
      process.env.MONGODB_ADDON_USER
    )
    mongoose.connect(process.env.MONGODB_ADDON_URI, options, function (error) {
      if (error) {
        return reject(error)
      }
      debug(
        'Connected to %s with user %s',
        process.env.MONGODB_ADDON_URI,
        process.env.MONGO_INITDB_USERNAME
      )
      resolve(true)
    })
  }).catch(err => {
    console.error(err)
    setTimeout(connect, 10000) // try to reconnect in 10s
  })
}

module.exports = connect()
