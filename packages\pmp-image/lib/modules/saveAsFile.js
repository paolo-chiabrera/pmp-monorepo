import Joi from 'joi';
import path from 'path';
import fs from 'fs';
import needle from 'needle';

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

    needle.get(val.url)
    .pipe(fs.createWriteStream(filePath))
    .on('error', done)
    .on('close', () => {
      done(null, {
        filePath: filePath
      });
    });
  });
}
