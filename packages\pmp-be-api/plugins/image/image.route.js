'use strict';

const Joi = require('joi');

const methods = require('./image.method');

/* routes */

module.exports.getByFilename = {
  method: 'GET',
  path: '/images/{filename}',
  config: {
    handler: (req, reply) => reply(methods.getByFilename({
      filename: req.params.filename
    })),
    tags: ['api', 'image'],
    description: 'Get an image',
    notes: 'Returns the image',
    validate: {
      params: {
        filename: Joi.string().required().description('filename of the image')
      }
    }
  }
};

module.exports.deleteByFilename = {
  method: 'DELETE',
  path: '/images/{filename}',
  config: {
    handler: (req, reply) => reply(methods.deleteByFilename({
      filename: req.params.filename
    })),
    tags: ['api', 'image'],
    description: 'Delete an image',
    notes: 'Returns the deleted image',
    validate: {
      params: {
        filename: Joi.string().required().description('filename of the image')
      }
    }
  }
};

module.exports.putByFilename = {
  method: 'PUT',
  path: '/images/{filename}',
  config: {
    handler: (req, reply) => reply(methods.putByFilename({
      data: req.payload,
      filename: req.params.filename
    })),
    tags: ['api', 'image'],
    description: 'Updates an image',
    notes: 'Returns the image',
    validate: {
      payload: Joi.object().min(1).required().keys({
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
        })
      }),
      params: {
        filename: Joi.string().required().description('filename of the image')
      }
    }
  }
};

module.exports.postImage = {
  method: 'POST',
  path: '/images',
  config: {
    handler: (req, reply) => reply(methods.create({
      data: req.payload
    })),
    tags: ['api', 'image'],
    description: 'Creates an image',
    notes: 'Returns the image',
    validate: {
      payload: Joi.object().keys({
        filename: Joi.string().required(),
        url: Joi.string().required(),
        source: Joi.string().required(),
        index: Joi.number().optional(),
        thumbs: Joi.array().items(Joi.number()).optional(),
        meta: Joi.object().optional().keys({
          width: Joi.number().optional(),
          height: Joi.number().optional(),
          size: Joi.number().optional(),
          format: Joi.string().optional()
        })
      }).required().description('image data')
    }
  }
};

module.exports.getById = {
  method: 'GET',
  path: '/images/id/{id}',
  config: {
    handler: (req, reply) => reply(methods.getById({
      data: req.params.id
    })),
    tags: ['api', 'image'],
    description: 'Get an image',
    notes: 'Returns the image',
    validate: {
      params: {
        id: Joi.string().required().description('id of the image')
      }
    }
  }
};

module.exports.deleteById = {
  method: 'DELETE',
  path: '/images/id/{id}',
  config: {
    handler: (req, reply) => reply(methods.deleteById({
      data: req.params.id
    })),
    tags: ['api', 'image'],
    description: 'Delete an image by id',
    notes: 'Returns the deleted image',
    validate: {
      params: {
        id: Joi.string().required().description('id of the image')
      }
    }
  }
};

module.exports.getImagesByQuery = {
  method: 'GET',
  path: '/images/query',
  config: {
    handler: (req, reply) => reply(methods.getImagesByQuery({
      query: req.query
    })),
    tags: ['api', 'image'],
    description: 'Get images by query',
    notes: 'Returns the images',
    validate: {
      query: Joi.object().min(1).required()
    }
  }
};

module.exports.getSources = {
  method: 'GET',
  path: '/images/sources',
  config: {
    handler: (req, reply) => reply(methods.getSources()),
    tags: ['api', 'image'],
    description: 'Get all the images sources',
    notes: 'Returns the sources'
  }
};

module.exports.getImagesWithoutThumbs = {
  method: 'GET',
  path: '/images/without-thumbs',
  config: {
    handler: (req, reply) => reply(methods.getImagesWithoutThumbs()),
    tags: ['api', 'image'],
    description: 'Get all the images without thimbs',
    notes: 'Returns the images'
  }
};

module.exports.count = {
  method: 'GET',
  path: '/images/count',
  config: {
    handler: (req, reply) => reply(methods.count()),
    tags: ['api', 'image'],
    description: 'Count all the images',
    notes: 'Returns the count'
  }
};

module.exports.existing = {
  method: 'POST',
  path: '/images/existing',
  config: {
    handler: (req, reply) => reply(methods.findExisting(req.payload)),
    tags: ['api', 'image'],
    description: 'Get all the duplicates',
    notes: 'Returns the duplicates',
    validate: {
      payload: Joi.object().length(1).required()
    }
  }
};

module.exports.countBySource = {
  method: 'GET',
  path: '/images/countBySource',
  config: {
    handler: (req, reply) => reply(methods.countBySource()),
    tags: ['api', 'image'],
    description: 'Returns the number of images grouped by source',
    notes: 'Returns the counts'
  }
};

module.exports.getBuckets = {
  method: 'POST',
  path: '/images/buckets',
  config: {
    handler: (req, reply) => reply(methods.getBuckets()),
    tags: ['api', 'image'],
    description: 'Get all the images buckets'
  }
};

module.exports.reindex = {
  method: 'POST',
  path: '/images/reindex',
  config: {
    handler: (req, reply) => {
      let count = 0;
      const interval = 100;

      function progress(totalImages, counters) {
        if (count % interval === 0) {
          req.server.log(['info', 'reindex-progress'], {
            count,
            counters,
            totalImages,
            percentage: Math.floor((count / totalImages) * 100)
          });
        }
        count++;
      }

      req.server.log(['info', 'reindex-start']);

      const start = Date.now();

      methods.reindexImages(progress)
      .then(counters => req.server.log(['info', 'reindex-done'], {
        counters,
        execTime: Math.floor((Date.now() - start) / 1000)
      }))
      .catch(error => req.server.log(['error', 'reindex-error'], {
        error
      }));

      reply({message: 'reindex started'});
    },
    tags: ['api', 'image'],
    description: 'Reindex all the images with thumbs'
  }
};
