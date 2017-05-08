import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

import PmpPaletteModel from 'pmp-palette-model';

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
  },
  palette: {
    type: PmpPaletteModel.schema,
    default: PmpPaletteModel.schema
  }
});

imageSchema.plugin(timestamps);

export default mongoose.model('ImageModel', imageSchema, 'images');
