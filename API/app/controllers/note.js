'use strict'

const validator = require('../validators/notes')
const router = require('express').Router()
const authentification = require('../libs/authentificationJwt')
const _ = require('lodash')
const mongoose = require('mongoose')
const Note = mongoose.model('notes')
const Boom = require('boom')

module.exports = (app) => {
  app.use('/note', router)
}

/**
 * CRUD on collection's notes
 */

router.post(
	'/',
	validator.CREATE,
	authentification.verify,
	(req, res, next) => {

})

router.get(
	'/',
	validator.READ,
	authentification.verify,
	(req, res, next) => {

})

router.put(
	'/',
	validator.UPDATE,
	authentification.verify,
	(req, res, next) => {
	
})

router.delete(
	'/',
	validator.DELETE,
	authentification.verify,
	(req, res, next) => {
	
})