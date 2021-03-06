'use strict'

const validator = require('../validators/notes')
const router = require('express').Router()
const authentification = require('../libs/authentificationJwt')
const validationErrorsResponses = require('../libs/validationResponses')
const queryParams = require('../libs/queryParams')
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
  validationErrorsResponses,
  authentification.verify,
  async (req, res, next) => {
    const notes = await Note.find({ })
    res.json({ notes })
  })
  
router.get(
  '/populate/:noteId',
  validator.LIST,
  validationErrorsResponses,
  authentification.verify,
  async (req, res, next) => {
    const notes = await Note.findOne({ _id: _.get(req, 'params.noteId', null) }).populate({ path: 'sessionId' })
    res.json({ notes })
  })
    
router.post(
  '/',
  validator.CREATE,
  validationErrorsResponses,
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
  validationErrorsResponses,
  authentification.verify,
  queryParams,
  (req, res, next) => {
    Note.populateItem(req.paginator)
      .then(note => res.json(_.get(note, [0], {})))
      .catch(next)
  })
        
router.put(
  '/:noteId',
  validator.UPDATE,
  validationErrorsResponses,
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
  validationErrorsResponses,
  authentification.verify,
  async (req, res, next) => {
    const note = await Note.findOne({ _id: _.get(req, 'params.noteId', null) })
    note.remove()
    res.json({ status: true, message: 'Note deleted.' })
  })
