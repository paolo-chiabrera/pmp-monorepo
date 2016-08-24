import Joi from 'joi';
import async from 'async';
import _ from 'lodash';

import main from './modules/main'

export default class PmpImage {
  constructor(sourceId, options) {
    this.sourceId = sourceId;

    this.options = {
      pmpApiUrl: 'http://api.picmeplease.eu',
      folderPath: './images',
      dimensions: [150, 300],
      request: {
        json: true,
        headers: {}
      }
    }

    this.options = _.merge(this.options, options);
  }

  save(args, done) {
    const schema = Joi.object().required().keys({
      url: Joi.string().required()
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
            source: this.source
          }, next);
        },
        saveAsFile: ['generateFilename', (results, next) => {
          main.saveAsFile({
            url: val.url,
            filename: results.generateFilename.filename,
            folderPath: this.options.folderPath
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
            destFolderPath: this.options.folderPath,
            dimensions: this.options.dimensions
          }, next);
        }],
        storeOnDB: ['generateThumbs', (results, next) => {
          const metadata = results.generateThumbs.metadata;

          main.storeOnDB({
            source: this.source,
            filename: results.generateFilename.filename,
            url: val.url,
            meta: {
              width: metadata.width,
              height: metadata.height,
              format: metadata.format,
              size: results.getFileStats.stats.size
            },
            options: this.options
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
}
