const slugify = require('slugify');

module.exports = {
  eleventyComputed: {
    layout: 'post',
    permalink: (data) => {
      if (process.env.ELEVENTY_ENV === 'production') {
        // Don't copy drafts to the output folder in production build.
        return false;
      } else {
        return `drafts/${slugify(data.title, { lower: true })}/`;
      }
    },
  },
};
