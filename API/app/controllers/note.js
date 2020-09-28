'use strict'

const validator = require('../validators/notes')
const router = require('express').Router()
const authentification = require('../libs/authentificationJwt')
const _ = require('lodash')
const mongoose = require('mongoose')
const Note = mongoose.model('notes')
const Boom = require('boom')
const param = require('../libs/param')
module.exports = (app) => {
  app.use('/note', router)
}

router.param('noteId', param('note', Note))
/**
 * CRUD on collection's notes
 */

router.get(
  '/',
  validator.DELETE,
  authentification.verify,
  async (req, res, next) => {
    const notes = await Note.find({ })
    console.log(notes)
    res.json({ notes })
  })

router.post(
  '/',
  validator.CREATE,
  authentification.verify,
  (req, res, next) => {
    const note = new Note({
      label: _.get(req, 'body.label', ''),
      userId: _.get(req, 'decoded.payload._id', ''),
      seesionId: []
    })
    note.save()
      .then(() => {
        return res.json({ status: true, message: 'Note create.' })
      })
  })

router.get(
  '/:noteId',
  validator.READ,
  authentification.verify,
  (req, res, next) => {

  })

router.put(
  '/:noteId',
  validator.UPDATE,
  authentification.verify,
  (req, res, next) => {

  })

router.delete(
  '/:noteId',
  validator.DELETE,
  authentification.verify,
  (req, res, next) => {

  })
