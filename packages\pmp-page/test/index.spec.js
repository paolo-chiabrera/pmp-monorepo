import { expect } from 'chai';
import sinon from 'sinon';

import async from 'async';

import mocks from './mocks';

import main from '../lib/modules/main';
import PmpPage from '../lib/index';

describe('pmp-page', function () {
	it('should be defined', function () {
		expect(PmpPage).to.be.an('object');
	});

	describe('scrape', function () {

		let getPageUrl, scrapeUrl, filterLinks, filterDuplicates, getImagesThreshold;

		beforeEach(function () {
			getPageUrl = sinon.stub(main, 'getPageUrl', (args, done) => {
				done(null, {
					url: mocks.targetUrl
				});
			});
			scrapeUrl = sinon.stub(main, 'scrapeUrl', (args, done) => {
				done(null, {
					results: mocks.scrapedUrls
				});
			});
			filterLinks = sinon.stub(main, 'filterLinks', (args, done) => {
				done(null, {
					links: mocks.filteredLinks
				});
			});
			filterDuplicates = sinon.stub(main, 'filterDuplicates', (args, done) => {
				done(null, {
					links: mocks.filteredDuplicates
				});
			});
			getImagesThreshold = sinon.stub(main, 'getImagesThreshold', (args, done) => {
				done(null, {
					perc: 1
				});
			});
		});

		afterEach(function () {
			getPageUrl.restore();
			scrapeUrl.restore();
			filterLinks.restore();
			filterDuplicates.restore();
			getImagesThreshold.restore();
		});

		it('should be defined', function () {
			expect(PmpPage.scrape).to.be.a('function');
		});

		it('should return an error: async.auto', sinon.test(function (done) {
			const fakeError = new Error('error');
			const auto = this.stub(async, 'auto', (args, done) => {
				done(fakeError);
			});

			const cb = this.spy(err => {
				expect(err).to.eql(fakeError);
				sinon.assert.calledOnce(auto);

				auto.restore();
				done();
			});

			PmpPage.scrape({
				pageNumber: mocks.pageNumber,
				options: mocks.options,
				source: mocks.source
			}, cb);
		}));

		it('should call all the chained methods', sinon.test(function (done) {
			const auto = this.spy(async, 'auto');

			const cb = this.spy(err => {
				expect(err).to.be.a('null');
				sinon.assert.calledOnce(auto);
				sinon.assert.calledOnce(getPageUrl);
				sinon.assert.calledOnce(scrapeUrl);
				sinon.assert.calledOnce(filterLinks);
				sinon.assert.calledOnce(filterDuplicates);
				sinon.assert.calledOnce(getImagesThreshold);

				auto.restore();
				done();
			});

			PmpPage.scrape({
				pageNumber: mocks.pageNumber,
				options: mocks.options,
				source: mocks.source
			}, cb);
		}));
	});
});
