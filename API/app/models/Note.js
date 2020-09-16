'use strict'

const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  label: {
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

mongoose.model('notes', noteSchema)
