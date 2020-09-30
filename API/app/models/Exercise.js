'use strict'

const mongoose = require('mongoose')

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
    default: 90 // minutes
  },
  createAt: {
    type: Date,
    default: Date.now()
  }
})

mongoose.model('exercises', exerciseSchema)
