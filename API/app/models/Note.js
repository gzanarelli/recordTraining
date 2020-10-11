'use strict'

const mongoose = require('mongoose')
const mongoosePopulate = require('../libs/mongoosePopulate')
const moment = require('moment')

const noteSchema = new mongoose.Schema({
  label: {
    type: String
  },
  objectif: {
    type: String,
    default: moment().format('LL'),
  },
  tag: {
    type: String
  },
  colorTag: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  sessionId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'sessions'
  }],
  createAt: {
    type: Date,
    default: Date.now()
  }
})

noteSchema.plugin(mongoosePopulate)

mongoose.model('notes', noteSchema)
