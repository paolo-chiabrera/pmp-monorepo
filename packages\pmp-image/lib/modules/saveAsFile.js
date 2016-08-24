import Joi from 'joi';
import path from 'path';
import needle from 'needle';
import fs from 'fs';

/**
* [saveAsFile description]
* @param  {Object}
* @param  {Function}
*/
export default function saveAsFile(args, done) {
  const schema = Joi.object().required().keys({
    url: Joi.string().required(),
    filename: Joi.string().required(),
    folderPath: Joi.string().required()
  });

  schema.validate(args, (err, val) => {
    if (err) {
      done(err);
      return;
    }

    const filePath = path.resolve(val.folderPath, val.filename);

    needle.get(val.url, {
      output: filePath
    }, (err, res) => {
      if (err) {
        done(err);
        return;
      }

      if (res.statusCode !== 200) {
        done(new Error('wrong statusCode ' + res.statusCode + ' ' + JSON.stringify(res.body)));
        return;
      }

      if (parseInt(res.bytes) <= 0) {
        fs.unlink(filePath, err => {
          if (err) {
            done(err);
            return;
          }

          done(new Error('response bytes ' + res.bytes));
        });
        return;
      }

      done(null, {
        filePath: filePath
      });
    });
  });
}
