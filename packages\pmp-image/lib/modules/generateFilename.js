import Joi from 'joi';
import url from 'url';
import path from 'path';
import crypto from 'crypto';

import validators from './validators';

/**
* [generateFilename description]
* @param  {Object}
* @param  {Function}
*/
export default function generateFilename(args, done) {
  const schema = Joi.object().required().keys({
    url: Joi.string().required(),
    sourceId: validators.sourceId
  });

  schema.validate(args, (err, val) => {
    if (err) {
      done(err);
      return;
    }

    const parsed = url.parse(val.url);

    const filename = val.sourceId + '_' + path.basename(parsed.pathname);

    const encrypted_filename = crypto
      .createHash('md5')
      .update(filename)
      .digest('hex');

    done(null, {
      filename: encrypted_filename + path.extname(parsed.pathname)
    });
  });
}
