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
  exercisesId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'exercises'
  }],
  createAt: {
    type: Date,
    default: Date.now()
  }
})

mongoose.model('sessions', sessionSchema)
