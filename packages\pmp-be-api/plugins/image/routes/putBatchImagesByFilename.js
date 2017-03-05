'use strict';

const Joi = require('joi');

const methods = require('../methods');
const responseHelper = require('hapi-response-helper');

module.exports = {
	method: 'PUT',
	path: '/images/batch',
	config: {
		handler: (req, reply) => {
			const { payload } = req;

			methods.updateImageByFilenameBatch({
				payload
			}, (err, res) => responseHelper(err, res, reply));
		},
		tags: ['api', 'image', 'batch'],
		description: 'Updates a batch of images',
		notes: 'Returns the images updated',
		validate: {
			payload: Joi.array().min(1).required().items(Joi.object().keys({
				filename: Joi.string().min(1).required(),
				data: Joi.object().required().keys({
					filename: Joi.string().optional(),
					url: Joi.string().optional(),
					source: Joi.string().optional(),
					index: Joi.number().optional(),
					thumbs: Joi.array().items(Joi.number()).optional(),
					meta: Joi.object().optional().keys({
						width: Joi.number().optional(),
						height: Joi.number().optional(),
						size: Joi.number().optional(),
						format: Joi.string().optional()
					}),
					palette: Joi.object().optional().keys({
						darkMuted: Joi.object().optional(),
						darkVibrant: Joi.object().optional(),
						lightMuted: Joi.object().optional(),
						lightVibrant: Joi.object().optional(),
						muted: Joi.object().optional(),
						vibrant: Joi.object().optional()
					})
				})
			}))
		}
	}
};
