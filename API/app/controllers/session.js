'use strict'

const validator = require('../validators/sessions')
const router = require('express').Router()
const authentification = require('../libs/authentificationJwt')
const _ = require('lodash')
const mongoose = require('mongoose')
const Session = mongoose.model('sessions')
const Note = mongoose.model('notes')
module.exports = (app) => {
  app.use('/session', router)
}

/**
 * CRUD on collection's notes
 */

router.get(
  '/',
  validator.LIST,
  authentification.verify,
  async (req, res, next) => {
    const sessions = await Session.find({ })
    res.json({ sessions })
  })

router.post(
  '/',
  validator.CREATE,
  authentification.verify,
  (req, res, next) => {
    const ID = mongoose.Types.ObjectId()
    const session = new Session({
      _id: ID,
      label: _.get(req, 'body.label', ''),
      userId: _.get(req, 'decoded.payload._id', ''),
      exerciceId: []
    })
    session.save()
      .then(() => {
        console.log(ID)
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
  authentification.verify,
  (req, res, next) => {
    Session.findOne({ _id: _.get(req, 'params.sessionId', null) })
      .then(session => res.json(_.omit(session.toJSON(), ['userId'])))
      .catch(next)
  })

router.put(
  '/:sessionId',
  validator.UPDATE,
  authentification.verify,
  (req, res, next) => {
    Session.updateOne({
      _id: _.get(req, 'params.sessionId', null)
    }, {
      $set: {
        label: _.get(req, 'body.label', ''),
        exerciceId: _.get(req, 'body.sessionId', [])
      }
    })
      .then(res.json({ status: true, message: 'Session updated.' }))
  })

router.delete(
  '/:sessionId',
  validator.DELETE,
  authentification.verify,
  (req, res, next) => {
    Session.deleteOne({ _id: _.get(req, 'params.sessionId', null) })
      .then(() => {
        Note.updateOne({ sessionId: { $in: _.get(req, 'params.sessionId', null) } },

          { $pull: { sessionId: _.get(req, 'params.sessionId', null) } })
          .then(res.json({ status: true, message: 'Session deleted.' }))
          .catch(next)
      })
  })
