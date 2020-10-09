'use strict'

const _ = require('lodash')

module.exports = (req, res, next) => {
	let populate = []
	let params = '' // only for mongoId for the moment
	if (typeof req.query.populate === 'string') {
    populate = _.get(req, 'query.populate', '').split(',')
	}

	if (req.params) {
		_.forOwn(_.get(req, 'params'), param => {
			params = param
		})
	}

	req.paginator = {
		populate,
		params
	}
	return next()
}