import { expect } from 'chai';
import PmpImageModel from '../lib';

const VALUES = {
  filename: 'fake-filename',
  url: 'fake-url',
  source: 'fake-source'
};

describe('pmp-image-model', function () {
  it('should expose an object', function () {
    expect(PmpImageModel).to.be.an.object;
  });

  it('should set the default values', function () {
    const model = new PmpImageModel(VALUES);

    expect(model.filename).to.equal(VALUES.filename);
    expect(model.url).to.equal(VALUES.url);
    expect(model.source).to.equal(VALUES.source);
    expect(model.sortIndex).to.equal(-1);
    expect(model.thumbs).to.be.an('array').and.to.be.empty;
    expect(model.meta.width).to.equal(0);
    expect(model.meta.height).to.equal(0);
    expect(model.meta.size).to.equal(0);
    expect(model.meta.format).to.equal('');
    expect(model.palette).to.be.an('object').and.not.to.be.empty;
  });
});
