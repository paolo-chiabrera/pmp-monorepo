import { expect } from 'chai';
import pmpPaletteModel from '../lib';

const VALUES = {
  darkMuted: {
    hex: '#000001',
    population: 1
  },
  darkVibrant: {
    hex: '#000002',
    population: 2
  },
  lightMuted: {
    hex: '#000003',
    population: 3
  },
  lightVibrant: {
    hex: '#000004',
    population: 4
  },
  muted: {
    hex: '#000005',
    population: 5
  },
  vibrant: {
    hex: '#000006',
    population: 6
  }
};

const DEFAULT_COLOUR = {
  hex: '',
  population: 0
};

describe('pmp-plaette-model', function () {
  it('should expose an object', function () {
    expect(pmpPaletteModel).to.be.an.object;
  });

  it('should set the default values', function () {
    const model = new pmpPaletteModel();

    expect(model.darkMuted.toObject()).to.deep.equal(DEFAULT_COLOUR);
    expect(model.darkVibrant.toObject()).to.deep.equal(DEFAULT_COLOUR);
    expect(model.lightMuted.toObject()).to.deep.equal(DEFAULT_COLOUR);
    expect(model.lightVibrant.toObject()).to.deep.equal(DEFAULT_COLOUR);
    expect(model.muted.toObject()).to.deep.equal(DEFAULT_COLOUR);
    expect(model.vibrant.toObject()).to.deep.equal(DEFAULT_COLOUR);
  });

  it('should populate a new document', function () {
    const model = new pmpPaletteModel(VALUES);

    expect(model.darkMuted.toObject()).to.deep.equal(VALUES.darkMuted);
    expect(model.darkVibrant.toObject()).to.deep.equal(VALUES.darkVibrant);
    expect(model.lightMuted.toObject()).to.deep.equal(VALUES.lightMuted);
    expect(model.lightVibrant.toObject()).to.deep.equal(VALUES.lightVibrant);
    expect(model.muted.toObject()).to.deep.equal(VALUES.muted);
    expect(model.vibrant.toObject()).to.deep.equal(VALUES.vibrant);
  });
});
