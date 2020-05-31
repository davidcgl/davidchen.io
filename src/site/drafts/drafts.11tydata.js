const path = require('path');
const slugify = require('slugify');

const isIndex = (page) => path.basename(page.inputPath) === 'index.liquid';

module.exports = {
  eleventyComputed: {
    layout: (data) => (isIndex(data.page) ? 'base' : 'post'),

    permalink: (data) => {
      if (process.env.ELEVENTY_ENV === 'production') {
        // Set `permalink: false` to prevent this page from getting copied to
        // the output folder in production.
        return false;
      } else if (isIndex(data.page)) {
        return `drafts/`;
      } else {
        return `drafts/${slugify(data.title, { lower: true })}/`;
      }
    },
  },
};
