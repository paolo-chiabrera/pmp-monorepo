export default {
  url: 'http://fakesource/image0.jpg',
  filename: 'test_filename.jpg',
  filePath: './test-images/test_filename.jpg',
  sourceId: 'fakesource',
  options: {
    pmpApiUrl: 'http://api.picmeplease.eu',
    folderPath: './test-images',
    dimensions: [100],
    request: {
      json: true,
      headers: {},
      open_timeout: 0
    }
  },
  image: {
    filename: 'test_filename.jpg',
    url: 'http://fakesource/image0.jpg',
    source: 'fakesource',
    thumbs: [300, 600]
  },
  links: ['fail', 'http://fakesource/image0.jpg', 'http://fakesource/image1.jpg'],
  metadata: {
    width: 100,
    height: 100,
    format: 'jpeg'
  },
  dimensions: [100]
};
