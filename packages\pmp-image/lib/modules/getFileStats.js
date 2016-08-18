import Joi from 'joi';
import fs from 'fs';

/**
* [getFileStats description]
* @param  {Object}
* @param  {Function}
*/
export default function getFileStats(args, done) {
  const schema = Joi.object().required().keys({
    filePath: Joi.string().required()
  });

  schema.validate(args, (err, val) => {
    if (err) {
      done(err);
      return;
    }

    fs.stat(val.filePath, (err, stats) => {
      if (err) {
        done(err);
        return;
      }

      done(null, {
        stats: stats
      });
    });
  });
}
