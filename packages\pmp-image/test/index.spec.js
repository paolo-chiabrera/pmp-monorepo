import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

import async from 'async';

import mocks from './mocks';

import PmpImage from '../lib/index';

import main from '../lib/modules/main';

describe('pmp-image', function () {
	it('should be defined', function () {
		expect(PmpImage).to.be.an('object');
	});

	describe('save', function () {
		it('should be defined', function () {
			expect(PmpImage.save).to.be.a('function');
		});

		it('should return an error: async.auto', sinon.test(function (done) {
			const fakeError = new Error('fakeError');
			const asyncAuto = this.stub(async, 'auto', (args, callback) => {
				callback(fakeError);
			});
			const cb = this.spy(err => {
				expect(asyncAuto).to.have.been.calledOnce;
				expect(err).to.eql(fakeError);

				asyncAuto.restore();
				done();
			});

			PmpImage.save({
				options: mocks.options,
				url: mocks.image.url,
				sourceId: mocks.sourceId
			}, cb);
		}));

		it('should return an image', sinon.test(function (done) {
			const generateFilename = this.stub(main, 'generateFilename', (args, callback) => {
				callback(null, {
					filename: mocks.image.filename
				});
			});
			const saveAsFile = this.stub(main, 'saveAsFile', (args, callback) => {
				callback(null, {
					filePath: mocks.options.folderPath + '/' + mocks.image.filename
				});
			});
			const storeOnDB = this.stub(main, 'storeOnDB', (args, callback) => {
				callback(null, {
					image: mocks.image
				});
			});

			const cb = this.spy((err, res) => {
				expect(err).to.be.a('null');
				expect(generateFilename).to.have.been.calledOnce;
				expect(saveAsFile).to.have.been.calledOnce;
				expect(storeOnDB).to.have.been.calledOnce;
				expect(res).to.be.an('object');

				generateFilename.restore();
				saveAsFile.restore();
				storeOnDB.restore();
				done();
			});

			PmpImage.save({
				options: mocks.options,
				url: mocks.image.url,
				sourceId: mocks.sourceId
			}, cb);
		}));
	});

	describe('saveBatch', function () {
		it('should be defined', function () {
			expect(PmpImage.saveBatch).to.be.a('function');
		});

		it('should return an error: async.eachLimit', sinon.test(function (done) {
			const fakeError = new Error('fakeError');
			const eachLimit = this.stub(async, 'eachLimit', (links, concurrency, worker, callback) => {
				callback(fakeError);
			});
			const cb = this.spy(err => {
				expect(eachLimit).to.have.been.calledOnce;
				expect(err).to.eql(fakeError);

				eachLimit.restore();
				done();
			});

			PmpImage.saveBatch({
				options: mocks.options,
				links: mocks.links,
				sourceId: mocks.sourceId
			}, cb);
		}));

		it('should return 1 error AND 2 images', sinon.test(function (done) {
			const fakeError = new Error('fakeError');
			const save = this.stub(PmpImage, 'save', (args, callback) => {
				if (args.url === 'fail') {
					callback(fakeError);
				} else {
					callback(null, mocks.image);
				}
			});
			const cb = this.spy((err, res) => {
				expect(save).to.have.been.calledThrice;
				expect(err).to.equal(null);
				expect(res).to.be.an('object');

				expect(res.errors).to.have.length(1);
				expect(res.errors[0]).to.eql({
					message: fakeError.message,
					url: mocks.links[0]
				});

				expect(res.images).to.have.length(2);
				expect(res.images[0]).to.eql({
					filename: mocks.image.filename,
					url: mocks.links[1]
				});

				save.restore();
				done();
			});

			PmpImage.saveBatch({
				options: mocks.options,
				links: mocks.links,
				sourceId: mocks.sourceId
			}, cb);
		}));
	});
});
