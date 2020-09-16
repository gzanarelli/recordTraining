'use strict'

const mongoose = require('mongoose')

const exerciceSchema = new mongoose.Schema({
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
  exerciceId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'exercices'
  }],
  createAt: {
    type: Date,
    default: Date.now()
  }
})

mongoose.model('exercices', exerciceSchema)
