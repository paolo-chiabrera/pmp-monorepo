import { expect } from 'chai';
import sinon from 'sinon';

import filterLinks from '../../lib/modules/filterLinks';

import mocks from '../mocks';

describe('filterLinks', function () {
	it('should be defined', function () {
		expect(filterLinks).to.be.a('function');
	});

	it('should return all the valid links', sinon.test(function (done) {
		const cb = this.spy((err, res) => {
			expect(err).to.be.a('null');
			expect(res).to.be.an('object');
			expect(res.links).to.deep.equal(mocks.filteredLinks);

			done();
		});

		filterLinks({
			links: mocks.scrapedUrls
		}, cb);
	}));
});
