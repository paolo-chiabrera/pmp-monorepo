import { expect } from 'chai';
import sinon from 'sinon';
sinon.config = {
	useFakeTimers: false
};

import needle from 'needle';

import scrapeUrl from '../../lib/modules/scrapeUrl';

import mocks from '../mocks';

function _scrapeUrl(callback) {
	const { options, retryInterval, source, targetUrl } = mocks;

	scrapeUrl({
		options,
		retryInterval,
		source,
		targetUrl
	}, callback);
}

describe('scrapeUrl', function () {
	it('should be defined', function () {
		expect(scrapeUrl).to.be.a('function');
	});

	it('should return an error: needle.post', sinon.test(function (done) {
		const fakeError = new Error('error');
		const needlePost = sinon.stub(needle, 'post', (url, payload, options, callback) => {
			callback(fakeError);
		});

		const cb = this.spy(err => {
			sinon.assert.calledThrice(needlePost);
			expect(err).to.eql(fakeError);

			needlePost.restore();
			done();
		});

		_scrapeUrl(cb);
	}));

	it('should return an error: statusCode', sinon.test(function (done) {
		const statusCode = 401;
		const statusError = new Error('wrong statusCode ' + statusCode);
		const needlePost = sinon.stub(needle, 'post', (url, payload, options, callback) => {
			callback(null, {
				statusCode: statusCode
			});
		});

		const cb = this.spy(err => {
			sinon.assert.calledThrice(needlePost);
			expect(err).to.eql(statusError);

			needlePost.restore();
			done();
		});

		_scrapeUrl(cb);
	}));

	it('should return an error: res.body is not valid', sinon.test(function (done) {
		const error = new Error('res.body is not valid');
		const needlePost = sinon.stub(needle, 'post', (url, payload, options, callback) => {
			callback(null, {
				statusCode: 200,
				body: null
			});
		});

		const cb = this.spy(err => {
			sinon.assert.calledThrice(needlePost);
			expect(err).to.deep.equal(error);

			needlePost.restore();
			done();
		});

		_scrapeUrl(cb);
	}));

	it('should return an error: res.body.results is not an array', sinon.test(function (done) {
		const error = new Error('res.body.results is not an array');
		const needlePost = sinon.stub(needle, 'post', (url, payload, options, callback) => {
			callback(null, {
				statusCode: 200,
				body: {
					results: null
				}
			});
		});

		const cb = this.spy(err => {
			sinon.assert.calledThrice(needlePost);
			expect(err).to.deep.equal(error);

			needlePost.restore();
			done();
		});

		_scrapeUrl(cb);
	}));

	it('should return successfully', sinon.test(function (done) {
		const needlePost = sinon.stub(needle, 'post', (url, payload, options, callback) => {
			expect(url).to.eql(mocks.options.scraperApiUrl + '/scrape');
			expect(payload).to.eql({
				url: mocks.targetUrl,
				selectors: {
					page: mocks.source.mainPageSelector + '@' + mocks.source.mainPageAttribute,
					image: mocks.source.imagePageSelector + '@' + mocks.source.imagePageAttribute
				}
			});
			expect(options).to.eql(mocks.options.request);

			callback(null, {
				statusCode: 200,
				body: {
					results: []
				}
			});
		});

		const cb = this.spy((err, res) => {
			sinon.assert.calledOnce(needlePost);
			expect(err).to.be.a('null');
			expect(res.links).to.deep.equal([]);

			needlePost.restore();
			done();
		});

		_scrapeUrl(cb);
	}));
});
