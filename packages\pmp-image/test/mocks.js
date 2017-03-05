export default {
	url: 'http://fakesource/image0.jpg',
	filename: 'test_filename.jpg',
	filePath: './test-images/test_filename.jpg',
	sourceId: 'fakesource',
	options: {
		concurrency: 2,
		pmpApiUrl: 'http://api.picmeplease.eu',
		folderPath: './test-images',
		request: {
			json: true,
			headers: {}
		}
	},
	image: {
		filename: 'test_filename.jpg',
		url: 'http://fakesource/image0.jpg',
		source: 'fakesource'
	},
	links: ['fail', 'http://fakesource/image0.jpg', 'http://fakesource/image1.jpg']
};
