import { expect } from 'chai';
import sinon from 'sinon';

import generateFilename from '../../lib/modules/generateFilename';

import mocks from '../mocks';

describe('generateFilename', function () {
	it('should be defined', function () {
		expect(generateFilename).to.be.a('function');
	});

	it('should return the image filename', sinon.test(function (done) {
		const cb = this.spy((err, res) => {
			expect(err).to.be.a('null');
			expect(res).to.be.an('object');
			expect(res.filename).to.be.a('string');

			done();
		});

		generateFilename({
			url: mocks.url,
			sourceId: mocks.sourceId
		}, cb);
	}));
});
