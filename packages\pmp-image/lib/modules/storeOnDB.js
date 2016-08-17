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
    imageUrl: Joi.string().required(),
    options: validators.options
  });

  schema.validate(args, (err, val) => {
    if (err) {
      done(err);
      return;
    }

    const url = val.options.pmpApiUrl + '/images';

    const payload = {
      filename: val.filename,
      imageUrl: val.imageUrl,
      source: val.source.id
    };

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
