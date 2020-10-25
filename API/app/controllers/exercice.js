'use strict'

const validator = require('../validators/exercises')
const router = require('express').Router()
const authentification = require('../libs/authentificationJwt')
const validationErrorsResponses = require('../libs/validationResponses')
const queryParams = require('../libs/queryParams')
const _ = require('lodash')
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
    console.log('Body: ', req.body)
    const exercise = new Exercise({
      _id: ID,
      value: _.get(req, 'body.value', 'nc'),
      label: _.get(req, 'body.label', 'N/C'),
      numberSessions: _.get(req, 'body.numberSessions', 1),
      numberRepetitions: _.get(req, 'body.numberRepetitions', 1),
      weight: _.get(req, 'body.weight', 1),
      timeOut: _.get(req, 'body.timeOut', '1'),
      category: _.get(req, 'body.category', ''),
      select: true
    })
    return exercise.save()
      .then(() => {
        console.log(ID)
        res.json({ status: true, ID })
        })
      .catch(next)
  })

router.get(
  '/:exerciseId',
  validator.READ,
  validationErrorsResponses,
  authentification.verify,
  queryParams,
  (req, res, next) => {
    Exercise.populateItem(req.paginator)
      .then(exercise => res.json(_.get(exercise, [0], {})))
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
        value: _.get(req, 'body.value'),
        label: _.get(req, 'body.label'),
        numberSessions: _.get(req, 'body.numberSessions'),
        numberRepetitions: _.get(req, 'body.numberRepetitions'),
        weight: _.get(req, 'body.weight'),
        timeOut: _.get(req, 'body.timeOut'),
        category: _.get(req, 'body.category', ''),
        select: true
      }
    })
      .then(() => res.json({ status: true, ID: _.get(req, 'params.exerciseId', null) }))
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
