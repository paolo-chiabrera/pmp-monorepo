import { expect } from 'chai';

import main from '../../lib/modules/main';

describe('main', () => {
	it('should be an object', () => {
		expect(main).to.be.an('object');
	});

	it('should expose generateFilename', () => {
		expect(main.generateFilename).to.be.a('function');
	});

	it('should expose saveAsFile', () => {
		expect(main.saveAsFile).to.be.a('function');
	});

	it('should expose storeOnDB', () => {
		expect(main.storeOnDB).to.be.a('function');
	});
});
