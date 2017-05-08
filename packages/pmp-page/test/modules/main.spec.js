import { expect } from 'chai';

import main from '../../lib/modules/main';

describe('main', () => {
	it('should be an object', () => {
		expect(main).to.be.an('object');
	});

	it('should expose filterDuplicates', () => {
		expect(main.filterDuplicates).to.be.a('function');
	});

	it('should expose filterLinks', () => {
		expect(main.filterLinks).to.be.a('function');
	});

	it('should expose getPageUrl', () => {
		expect(main.getPageUrl).to.be.a('function');
	});

	it('should expose scrapeUrl', () => {
		expect(main.scrapeUrl).to.be.a('function');
	});

	it('should expose getImagesThreshold', () => {
		expect(main.getImagesThreshold).to.be.a('function');
	});
});
