'use strict'

const _ = require('lodash')
const Promise = require('bluebird')

module.exports = (schema) => {
	schema.statics.populateItem = populateItem
}

function populateItem (options, cb) {
	const query = this.find({_id: _.get(options, 'params')})
	const populate = options.populate
	let promises = Promise.resolve()
	// To secure if not ObjectID
	_.map(populate, item => {
			query.populate(item)
	})
	promises = query.exec()
	return promises
}