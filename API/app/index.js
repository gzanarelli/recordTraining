'use strict'

const os = require('os')
const cluster = require('cluster')

// if (cluster.isMaster) {
//   const nCpus = os.cpus().length
//   console.log('*******************')
//   console.log('Number of cpus: ', nCpus)
//   console.log('*******************')
//   for (let i = 0; i < nCpus; i++) {
//     cluster.fork()
//   }
// } else {
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
  console.log('this the process: ', process.pid)
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
const pid = process.pid
app.listen(process.env.PORT, () => {
  console.log('Process: ' + pid + ', listen on port ' + process.env.PORT)
})
// }
