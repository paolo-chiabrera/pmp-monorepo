import _ from 'lodash';
import needle from 'needle';
import Joi from 'joi';

import validators from './modules/validators';

function getById(args, done) {
  const schema = Joi.object().required().keys({
    sourceId: validators.sourceId,
    options: validators.options
  });

  schema.validate(args, (err, val) => {
    if (err) {
      done(err);
      return;
    }

    const url = val.options.pmpApiUrl + '/sources/' + val.sourceId;

    needle.get(url, val.options.request, (err, res) => {
      if (err) {
        done(err);
        return;
      }

      if (res.statusCode !== 200) {
        done(new Error('wrong statusCode ' + res.statusCode));
        return;
      }

      if (!_.isObject(res.body) || _.isEmpty(res.body)) {
        done(new Error('source not found: ' + val.sourceId));
        return;
      }

      done(null, res.body)
    });
  });
}

export default {
  getById
}
