import Joi from 'joi';
import path from 'path';
import needle from 'needle';
import fs from 'fs';
import async from 'async';

import validators from './validators';

/**
* [saveAsFile description]
* @param  {Object}
* @param  {Function}
*/
export default function saveAsFile(args, done) {
  const schema = Joi.object().required().keys({
    url: Joi.string().required(),
    filename: Joi.string().required(),
    folderPath: Joi.string().required(),
    retryInterval: validators.retryInterval
  });

  schema.validate(args, (err, val) => {
    if (err) {
      done(err);
      return;
    }

    const filePath = path.resolve(val.folderPath, val.filename);

    async.retry({
      times: 3,
      interval: val.retryInterval
    }, next => {
      needle.get(val.url, {
        output: filePath
      }, (err, res) => {
        if (err) {
          next(err);
          return;
        }

        if (res.statusCode !== 200) {
          next(res.body);
          return;
        }

        if (parseInt(res.bytes) <= 0) {
          fs.unlink(filePath, err => {
            if (err) {
              next(err);
              return;
            }

            next(new Error('response bytes ' + res.bytes));
          });
          return;
        }

        next(null, {
          filePath: filePath
        });
      });
    }, done);
  });
}
