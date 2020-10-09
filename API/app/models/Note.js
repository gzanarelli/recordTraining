'use strict'

const mongoose = require('mongoose')
const mongoosePopulate = require('../libs/mongoosePopulate')
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

noteSchema.plugin(mongoosePopulate)

mongoose.model('notes', noteSchema)
