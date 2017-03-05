import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const paletteSchema = new Schema({
  darkMuted: {
    hex: {
      type: String,
      default: '',
      index: true
    },
    population: {
      type: Number,
      default: -1
    }
  },
  darkVibrant: {
    hex: {
      type: String,
      default: '',
      index: true
    },
    population: {
      type: Number,
      default: -1
    }
  },
  lightMuted: {
    hex: {
      type: String,
      default: '',
      index: true
    },
    population: {
      type: Number,
      default: -1
    }
  },
  lightVibrant: {
    hex: {
      type: String,
      default: '',
      index: true
    },
    population: {
      type: Number,
      default: -1
    }
  },
  muted: {
    hex: {
      type: String,
      default: '',
      index: true
    },
    population: {
      type: Number,
      default: -1
    }
  },
  vibrant: {
    hex: {
      type: String,
      default: '',
      index: true
    },
    population: {
      type: Number,
      default: -1
    }
  }
});

export default mongoose.model('PaletteModel', paletteSchema);
