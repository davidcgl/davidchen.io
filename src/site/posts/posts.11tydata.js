const slugify = require('slugify');

module.exports = {
  eleventyComputed: {
    layout: 'post',
    permalink: (data) => `${slugify(data.title, { lower: true })}/`,
  },
};
