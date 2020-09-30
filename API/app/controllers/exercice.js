'use strict'

const validator = require('../validators/exercises')
const router = require('express').Router()
const authentification = require('../libs/authentificationJwt')
const _ = require('lodash')
const validationErrorsResponses = require('../libs/validationResponses')
const mongoose = require('mongoose')
const Exercise = mongoose.model('exercises')
const Session = mongoose.model('sessions')

module.exports = (app) => {
  app.use('/exercise', router)
}

/**
 * CRUD on collection's exercises
 */

router.get(
  '/',
  validator.LIST,
  validationErrorsResponses,
  authentification.verify,
  async (req, res, next) => {
    const exercises = await Exercise.find({ })
    res.json({ exercises })
  })

router.post(
  '/',
  validator.CREATE,
  validationErrorsResponses,
  authentification.verify,
  (req, res, next) => {
    const ID = mongoose.Types.ObjectId()
    const exercise = new Exercise({
      _id: ID,
      value: _.get(req, 'body.value', 'nc'),
      label: _.get(req, 'body.label', 'N/C'),
      numberSessions: _.get(req, 'body.numberSessions', 1),
      numberRepetitions: _.get(req, 'body.numberRepetitions', 1),
      weight: _.get(req, 'body.weight', 1),
      timeOut: _.get(req, 'body.timeOut', '1')
    })
    exercise.save()
      .then(() => {
        console.log(ID)
        Session.updateOne({
          _id: _.get(req, 'body.sessionId', null)
        }, {
          $push: { exercisesId: ID }
        })
          .then(res.json({ status: true, message: 'Exercise create.' }))
      })
      .catch(next)
  })

router.get(
  '/:exerciseId',
  validator.READ,
  validationErrorsResponses,
  authentification.verify,
  (req, res, next) => {
    Exercise.findOne({ _id: _.get(req, 'params.exerciseId', null) })
      .then(exercise => res.json(_.omit(exercise.toJSON(), ['userId'])))
      .catch(next)
  })

router.put(
  '/:exerciseId',
  validator.UPDATE,
  validationErrorsResponses,
  authentification.verify,
  (req, res, next) => {
    Exercise.updateOne({
      _id: _.get(req, 'params.exerciseId', null)
    }, {
      $set: {
        value: _.get(req, 'body.value', 'nc'),
        label: _.get(req, 'body.label', 'N/C'),
        numberSessions: _.get(req, 'body.numberSessions', 1),
        numberRepetitions: _.get(req, 'body.numberRepetitions', 1),
        weight: _.get(req, 'body.weight', 1),
        timeOut: _.get(req, 'body.timeOut', '1')
      }
    })
      .then(res.json({ status: true, message: 'Exercise updated.' }))
  })

router.delete(
  '/:exerciseId',
  validator.DELETE,
  validationErrorsResponses,
  authentification.verify,
  (req, res, next) => {
    Exercise.deleteOne({ _id: _.get(req, 'params.exerciseId', null) })
      .then(() => {
        Session.updateOne({ exercisesId: { $in: _.get(req, 'params.exerciseId', null) } },
          { $pull: { exercisesId: _.get(req, 'params.exerciseId', null) } })
          .then(res.json({ status: true, message: 'Exercise deleted.' }))
          .catch(next)
      })
  })
