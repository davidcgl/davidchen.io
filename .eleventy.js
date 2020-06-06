const htmlmin = require('html-minifier');
const markdownIt = require('markdown-it');
const moment = require('moment');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = (config) => {
  config.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: '<!-- excerpt -->',
  });

  config.setLibrary('md', markdownIt({
    html: true,
    linkify: true,
    typographer: true,
  }));

  config.addPlugin(syntaxHighlight);

  config.addTransform('htmlmin', (content, outputPath) => {
    if (outputPath && outputPath.endsWith('.html')) {
      return htmlmin.minify(content, {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        removeOptionalTags: false, // breaks browser-sync if true
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      });
    }
    return content;
  });

  config.addFilter('date', (date, format) => {
    return moment(date).format(format);
  });

  config.addCollection('posts', (collection) => {
    const now = new Date();
    return collection
      .getFilteredByGlob('src/site/posts/*.md')
      .filter((post) =>
        process.env.ELEVENTY_ENV === 'production'
          ? post.date <= now && !post.data.draft
          : post.date <= now
      )
      .reverse();
  });

  config.addPassthroughCopy('src/site/assets');
  config.addPassthroughCopy('src/site/apple-touch-icon.png');
  config.addPassthroughCopy('src/site/favicon-16x16.png');
  config.addPassthroughCopy('src/site/favicon-32x32.png');
  config.addPassthroughCopy('src/site/favicon.ico');

  return {
    dir: { input: 'src/site', output: 'dist' },
    passthroughFileCopy: true,
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    templateFormats: ['html', 'md', 'njk'],
  };
};
