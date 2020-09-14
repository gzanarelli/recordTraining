'use strict'

const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const moment = require('moment')

module.exports = (app) => {
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(cors())
  app.use(morgan('tiny'))

  /**
   * Moment default config
   *
   * Monday is first day's week
  */
  moment.updateLocale('fr', {
    week: {
      dow: 1
    }
  })
}
