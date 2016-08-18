import Joi from 'joi';
import needle from 'needle';

import validators from './validators';

/**
* [storeOnDB description]
* @param  {Object}
* @param  {Function}
*/
export default function storeOnDB(args, done) {
  const schema = Joi.object().required().keys({
    source: validators.source,
    filename: Joi.string().required(),
    url: Joi.string().required(),
    options: validators.options,
    meta: validators.meta
  });

  schema.validate(args, (err, val) => {
    if (err) {
      done(err);
      return;
    }

    const url = val.options.pmpApiUrl + '/images';

    const payload = {
      filename: val.filename,
      url: val.url,
      source: val.source.id
    };

    if (val.meta) payload.meta = val.meta;

    if (val.options.dimensions) payload.thumbs = val.options.dimensions;

    needle.post(url, payload, val.options.request, (err, res) => {
      if (err) {
        done(err);
        return;
      }

      if (res.statusCode !== 200) {
        done(new Error('wrong statusCode ' + res.statusCode));
        return;
      }

      done(null, {
        image: res.body
      });
    });
  });
}
