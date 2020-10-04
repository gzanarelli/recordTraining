'use strict'

const validator = require('../validators/notes')
const router = require('express').Router()
const authentification = require('../libs/authentificationJwt')
const _ = require('lodash')
const mongoose = require('mongoose')
const Note = mongoose.model('notes')
module.exports = (app) => {
  app.use('/note', router)
}

/**
 * CRUD on collection's notes
 */

router.get(
  '/',
  validator.LIST,
  authentification.verify,
  async (req, res, next) => {
    const notes = await Note.find({ })
    res.json({ notes })
  })

router.post(
  '/',
  validator.CREATE,
  authentification.verify,
  (req, res, next) => {
    console.log(req.body)
    const note = new Note({
      label: _.get(req, 'body.label', ''),
      userId: _.get(req, 'decoded.payload._id', ''),
      seesionId: []
    })
    note.save()
      .then(() => {
        return res.json({ status: true, message: 'Note create.' })
      })
      .catch(next)
  })

router.get(
  '/:noteId',
  validator.READ,
  authentification.verify,
  (req, res, next) => {
    Note.findOne({ _id: _.get(req, 'params.noteId', null) })
      .then(note => res.json(_.omit(note.toJSON(), ['userId'])))
      .catch(next)
  })

router.put(
  '/:noteId',
  validator.UPDATE,
  authentification.verify,
  (req, res, next) => {
    Note.updateOne({
      _id: _.get(req, 'params.noteId', null)
    }, {
      $set: {
        label: _.get(req, 'body.label', ''),
        sessionId: _.get(req, 'body.sessionId', [])
      }
    })
      .then(res.json({ status: true, message: 'Note updated.' }))
  })

router.delete(
  '/:noteId',
  validator.DELETE,
  authentification.verify,
  async (req, res, next) => {
    const note = await Note.findOne({ _id: _.get(req, 'params.noteId', null) })
    note.remove()
    res.json({ status: true, message: 'Note deleted.' })
  })
