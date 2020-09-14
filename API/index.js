const express = require('express')
const app = express()

/**
 * Middleware initialization
 */
require('./start/init')(app)

app.get('/', (req, res, next) => {
  res.json({ home: 'Welcome to the home page' })
})

/**
 * Errors handler
 */
require('./start/error')(app)

app.listen(8181, () => {
  console.log('listen on port')
})
