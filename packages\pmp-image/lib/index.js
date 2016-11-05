import _ from 'lodash';
import async from 'async';
import Joi from 'joi';

import main from './modules/main';

import validators from './modules/validators';

function save (args, done = _.noop) {
  const schema = Joi.object().required().keys({
    options: validators.options,
    url: validators.link,
    sourceId: validators.sourceId
  });

  schema.validate(args, (err, val) => {
    if (err) {
      done(err);
      return;
    }

    async.auto({
      generateFilename: (next) => {
        main.generateFilename({
          url: val.url,
          sourceId: val.sourceId
        }, next);
      },
      saveAsFile: ['generateFilename', (results, next) => {
        main.saveAsFile({
          url: val.url,
          filename: results.generateFilename.filename,
          folderPath: val.options.folderPath
        }, next);
      }],
      getFileStats: ['saveAsFile', (results, next) => {
        main.getFileStats({
          filePath: results.saveAsFile.filePath
        }, next);
      }],
      generateThumbs: ['getFileStats', (results, next) => {
        main.generateThumbs({
          filePath: results.saveAsFile.filePath,
          destFolderPath: val.options.folderPath,
          dimensions: val.options.dimensions
        }, next);
      }],
      storeOnDB: ['generateThumbs', (results, next) => {
        const metadata = results.generateThumbs.metadata;

        main.storeOnDB({
          sourceId: val.sourceId,
          filename: results.generateFilename.filename,
          url: val.url,
          meta: {
            width: metadata.width,
            height: metadata.height,
            format: metadata.format,
            size: results.getFileStats.stats.size
          },
          options: val.options
        }, next);
      }]
    }, (err, results) => {
      if (err) {
        done(err);
        return;
      }

      done(null, results.storeOnDB.image);
    });
  });
}

function saveBatch (args, done = _.noop) {
  const schema = Joi.object().required().keys({
    options: validators.options,
    links: validators.links,
    sourceId: validators.sourceId
  });

  schema.validate(args, (err, val) => {
    if (err) {
      done(err);
      return;
    }

    const out = {
      errors: [],
      images: []
    };

    async.eachLimit(val.links, val.options.concurrency, (url, next) => {
      this.save({
        options: val.options,
        sourceId: val.sourceId,
        url
      }, (err, image) => {
        if (err) {
          out.errors.push({
            message: err.message,
            url
          });
        } else {
          out.images.push(_.pick(image, ['filename', 'url']));
        }

        next(null);
      });
    }, err => {
      if (err) {
        done(err);
        return;
      }

      done(null, out);
    });
  });
}

export default {
  save,
  saveBatch
};
