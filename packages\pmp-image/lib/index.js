import Joi from 'joi';
import async from 'async';
import _ from 'lodash';

import main from './modules/main'

export default class PMPImage {
  constructor(source, options) {
    this.source = source;

    this.options = {
      pmpApiUrl: 'http://api.picmeplease.eu',
      folderPath: './images',
      request: {
        json: true,
        headers: {}
      }
    }

    this.options = _.merge(this.options, options);
  }

  save(args, done) {
    const schema = Joi.object().required().keys({
      imageUrl: Joi.string().required()
    });

    schema.validate(args, (err, val) => {
      if (err) {
        done(err);
        return;
      }

      async.auto({
        generateFilename: (next) => {
          main.generateFilename({
            imageUrl: val.imageUrl,
            source: this.source
          }, next);
        },
        saveAsFile: ['generateFilename', (results, next) => {
          main.saveAsFile({
            imageUrl: val.imageUrl,
            filename: results.generateFilename.filename,
            folderPath: this.options.folderPath
          }, next);
        }],
        storeOnDB: ['saveAsFile', (results, next) => {
          main.storeOnDB({
            source: this.source,
            filename: results.generateFilename.filename,
            imageUrl: val.imageUrl,
            options: this.options
          }, next);
        }]
      }, (err, results) => {
        if (err) {
          done(err);
          return;
        }

        done(null, results);
      });
    });
  }
}
