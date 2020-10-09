'use strict'

const mongoose = require('mongoose')
const mongoosePopulate = require('../libs/mongoosePopulate')

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

sessionSchema.plugin(mongoosePopulate)

mongoose.model('sessions', sessionSchema)
