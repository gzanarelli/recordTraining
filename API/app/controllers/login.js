'use strict'

const validator = require('../validators/login')
const router = require('express').Router()
const authentification = require('../libs/authentificationJwt')
const _ = require('lodash')
const mongoose = require('mongoose')
const User = mongoose.model('users')
const Boom = require('boom')
const bcrypt = require('bcrypt')

const roundSalt = 10

module.exports = (app) => {
  app.use('/', router)
}

router.post(
  '/login',
  validator.LOGIN,
  (req, res, next) => {
    const { email, password } = req.body
    User.findOne({ email })
    .then(async user => {
      if (user) {
        const match = await bcrypt.compare(password, user.password)
        if (match) {
          authentification.sign(
            {
              email: _.get(user, 'email',null),
              _id: _.get(user, '_id',null)
            },
            process.env.JWT_PRIVATE,
            process.env.EXPIRE_TOKEN
            ).then(token => {
              return res.json({ token })
          })
        } else {
          return next(Boom.unauthorized('Password doesn\'t match.'))
        }
      } else {
        return next(Boom.unauthorized('Email doesn\'t exist.'))
      }
    })
})

router.post(
  '/signup', 
  validator.SIGNUP,
  (req, res, next) => {
    const { email, password, pseudo } = req.body
    User.findOne({ email })
    .then(user => {
      if (user) {
        return next(Boom.conflict('Account already exist.'))
      } else {
        bcrypt.hash(password, roundSalt, (err, hash) => {
          new User({
            password: hash,
            email,
            pseudo
          })
          .save()
          .then(() => {
            return res.json({ message: 'Account create' })
          })
        }) 
      }
    })
})
