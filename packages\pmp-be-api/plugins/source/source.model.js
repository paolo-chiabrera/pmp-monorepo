'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sourceSchema = new Schema({
	id : { type: String, index: { unique: true }},
	active: { type: Boolean, default: false },
	schedule: { type: String, default: '0 0 0 * * *' },
	threshold: { type: Number, default: 0.5 },
	url : String,
	offset : Number,
	startingOffset : { type: Number, default: 0 },
	mainPageSelector: String,
	mainPageAttribute: String,
	imagePageSelector: String,
	imagePageAttribute: String
});

/* exports */

module.exports = mongoose.model('SourceModel', sourceSchema, 'sources');
