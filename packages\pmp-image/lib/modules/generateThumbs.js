import Joi from 'joi';
import path from 'path';
import async from 'async';
import sharp from 'sharp';

/**
* [generateThumbs description]
* @param  {Object}
* @param  {Function}
*/
export default function generateThumbs(args, done) {
  const schema = Joi.object().required().keys({
    filePath: Joi.string().required(),
    destFolderPath: Joi.string().required(),
    dimensions: Joi.array().items(Joi.number()).min(1).required()
  });

  schema.validate(args, (err, val) => {
    if (err) {
      done(err);
      return;
    }

    const parsed = path.parse(val.filePath);

    const image = sharp(val.filePath).sequentialRead();

    image.metadata((err, metadata) => {
      if (err) {
        done(err);
        return;
      }

      async.eachSeries(val.dimensions, (dim, next) => {

        const filename = parsed.name + '_' + dim + parsed.ext;

        const filePath = path.resolve(val.destFolderPath, filename);

        image
        .quality(90)
        .resize(dim)
        .toFile(filePath, next);
      }, err => {
        if (err) {
          done(err);
          return;
        }

        done(null, {
          metadata: metadata,
          thumbs: val.dimensions
        })
      });
    });
  });
}
