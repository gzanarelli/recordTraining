'use strict'

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
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

mongoose.model('users', userSchema)
