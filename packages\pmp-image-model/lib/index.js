import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;

const imageSchema = new Schema({
  filename: {
    type: String,
    require: true,
    index: {
      unique: true
    }
  },
  url: {
    type: String,
    require: true,
    index: {
      unique: true
    }
  },
  source: {
    type: String,
    require: true,
    index: true
  },
  sortIndex: {
    type: Number,
    default: -1,
    index: true
  },
  thumbs: {
    type: [Number],
    default: []
  },
  meta: {
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 0
    },
    format: {
      type: String,
      default: ''
    }
  }
});

imageSchema.plugin(timestamps);
imageSchema.plugin(mongoosePaginate);

export default mongoose.model('ImageModel', imageSchema, 'images');
