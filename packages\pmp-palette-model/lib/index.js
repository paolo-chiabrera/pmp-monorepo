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
      default: 0
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
      default: 0
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
      default: 0
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
      default: 0
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
      default: 0
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
      default: 0
    }
  }
});

export default mongoose.model('PaletteModel', paletteSchema);
