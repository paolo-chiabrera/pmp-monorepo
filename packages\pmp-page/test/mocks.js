export default {
  pageNumber: 0,
  targetUrl: 'http://fakesource/page/0',
  scrapedUrls: ['http://fakesource/image0.jpg', 'http://fakesource/image1.png', 'http://fakesource/image2.gif'],
  filteredLinks: ['http://fakesource/image0.jpg', 'http://fakesource/image1.png'],
  filteredDuplicates: ['http://fakesource/image0.jpg'],
  source: {
    id: 'fakesource',
    url: 'http://fakesource/page/{{offset}}',
    offset: 10,
    startingOffset: 0,
    mainPageSelector: 'a.link',
    mainPageAttribute: 'href',
    imagePageSelector: 'img.image',
    imagePageAttribute: 'src',
    threshold: 0.75,
    schedule: '0 0 0 * * * ',
    active: true
  },
  options: {
    pmpApiUrl: 'http://api.picmeplease.eu',
    scraperApiUrl: 'http://api.scraper.d3lirium.eu',
    request: {
      open_timeout: 0,
      json: true,
      headers: {}
    }
  },
  retryInterval: 1
};
