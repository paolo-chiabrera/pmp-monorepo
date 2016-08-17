export default {
  imageUrl: 'http://fakesource/image0.jpg',
  filename: 'test_filename.jpg',
  source: {
    id: 'fakesource',
    url: 'http://fakesource/page/{{offset}}',
    offset: 10,
    startingOffset: 0,
    mainPageSelector: 'a.link',
    mainPageAttribute: 'href',
    imagePageSelector: 'img.image',
    imagePageAttribute: 'src'
  },
  options: {
    pmpApiUrl: 'http://api.picmeplease.eu',
    folderPath: './test-images',
    request: {
      json: true,
      headers: {}
    }
  },
  image: {
    filename: 'test_filename.jpg',
    imageUrl: 'http://fakesource/image0.jpg',
    source: 'fakesource'
  }
};
