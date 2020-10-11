'use strict'

const validator = require('../validators/sessions')
const router = require('express').Router()
const authentification = require('../libs/authentificationJwt')
const validationErrorsResponses = require('../libs/validationResponses')
const queryParams = require('../libs/queryParams')
const _ = require('lodash')
const mongoose = require('mongoose')
const Session = mongoose.model('sessions')
const Note = mongoose.model('notes')
const Exercise = mongoose.model('exercises')
const Promise = require('bluebird')

module.exports = (app) => {
  app.use('/session', router)
}

/**
 * CRUD on collection's notes
 */

router.get(
  '/',
  validator.LIST,
  validationErrorsResponses,
  authentification.verify,
  async (req, res, next) => {
    const sessions = await Session.find({ })
    res.json({ sessions })
  })

router.get(
  '/',
  validator.LIST,
  validationErrorsResponses,
  authentification.verify,
  async (req, res, next) => {
    const sessions = await Session.find({ })
    res.json({ sessions })
  })

router.get(
  '/populate/:sessionId',
  validator.LIST,
  validationErrorsResponses,
  authentification.verify,
  async (req, res, next) => {
    console.log('coucocu on est bien passé dans le populate session')
    const sessions = await Session.findOne({ _id: _.get(req, 'params.sessionId', null) }).populate({ path: 'exercisesId' })
    res.json({ sessions })
  })

router.post(
  '/',
  validator.CREATE,
  validationErrorsResponses,
  authentification.verify,
  (req, res, next) => {
    const ID = mongoose.Types.ObjectId()
    const session = new Session({
      _id: ID,
      label: _.get(req, 'body.label', ''),
      userId: _.get(req, 'decoded.payload._id', ''),
      tag: _.get(req, 'body.tag', ''),
      colorTag: _.get(req, 'body.colorTag', ''),
      exercicesId: []
    })
    session.save()
      .then(() => {
        Note.updateOne({ _id: _.get(req, 'body.noteId') },
          { $push: { sessionId: ID } })
          .then(res.json({ status: true, message: 'Session create.' }))
          .catch(next)
      })
      .catch(next)
  })

router.get(
  '/:sessionId',
  validator.READ,
  validationErrorsResponses,
  authentification.verify,
  queryParams,
  (req, res, next) => {
    Session.populateItem(req.paginator)
    .then(session => res.json(_.get(session, [0], {})))
    .catch(next)
  })

router.put(
  '/:sessionId',
  validator.UPDATE,
  validationErrorsResponses,
  authentification.verify,
  (req, res, next) => {
    Session.updateOne({
      _id: _.get(req, 'params.sessionId', null)
    }, {
      $set: {
        label: _.get(req, 'body.label', ''),
        tag: _.get(req, 'body.tag', ''),
        colorTag: _.get(req, 'body.colorTag', ''),
      }
    })
      .then(res.json({ status: true, message: 'Session updated.' }))
  })

router.delete(
  '/:sessionId',
  validator.DELETE,
  validationErrorsResponses,
  authentification.verify,
  (req, res, next) => {
    Session.findOne({ _id: _.get(req, 'params.sessionId', null) })
      .then(session => {
        Promise.map(_.get(session, 'exercicesId', []), async exercice => {
          await Exercise.deleteOne({ _id: exercice })
        })
          .then(() => {
            Note.updateOne({ sessionId: { $in: _.get(req, 'params.sessionId', null) } },
              { $pull: { sessionId: _.get(req, 'params.sessionId', null) } })
              .then(res.json({ status: true, message: 'Session deleted.' }))
              .catch(next)
          })
      })
  })
