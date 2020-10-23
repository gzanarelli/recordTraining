'use strict'

const mongoose = require('mongoose')
const mongoosePopulate = require('../libs/mongoosePopulate')

const exerciseSchema = new mongoose.Schema({
  value: {
    type: String
  },
  label: {
    type: String
  },
  numberSessions: {
    type: Number,
    default: 3
  },
  numberRepetitions: {
    type: Number,
    default: 12
  },
  weight: {
    type: Number,
    default: 12 // kg
  },
  timeOut: {
    type: Number,
    default: '1' // minutes
  },
  select: {
    type: Boolean,
    default: true
  },
  createAt: {
    type: Date,
    default: Date.now()
  }
})

exerciseSchema.plugin(mongoosePopulate)

mongoose.model('exercises', exerciseSchema)
