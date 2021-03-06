'use strict'

const mongoose = require('mongoose')
const mongoosePopulate = require('../libs/mongoosePopulate')

const userSchema = new mongoose.Schema({
  email: {
    type: String
  },
  password: {
    type: String
  },
  pseudo: {
    type: String,
    default: (mongoose.Types.ObjectId()).toString()
  },
  height: {
    type: Number,
    default: 180 // cm
  },
  weight: {
    type: Number,
    default: 75 // kg
  },
  createAt: {
    type: Date,
    default: Date.now()
  }
})

userSchema.plugin(mongoosePopulate)

mongoose.model('users', userSchema)
