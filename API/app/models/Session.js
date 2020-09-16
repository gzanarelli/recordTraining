'use strict'

const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
  label: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
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

mongoose.model('sessions', sessionSchema)
