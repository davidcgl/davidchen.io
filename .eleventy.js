const paths = require('./paths.js');

module.exports = (config) => {
  const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
  config.addPlugin(syntaxHighlight);

  const markdownIt = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true,
  });
  config.setLibrary('md', markdownIt);

  const htmlmin = require('html-minifier');
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

  config.addPassthroughCopy(paths.siteAssetsDir);
  config.addPassthroughCopy(`${paths.siteDir}/favicon.ico`);

  config.addCollection('posts', (collection) => {
    const now = new Date();
    const isLive = (post) => post.date <= now;
    return collection
      .getFilteredByGlob(`${paths.siteDir}/posts/*.md`)
      .filter(isLive)
      .reverse();
  });

  config.addCollection('drafts', (collection) => {
    return [
      ...collection.getFilteredByGlob(`${paths.siteDir}/drafts/*.md`),
    ].reverse();
  });

  return {
    dir: { input: paths.siteDir, output: 'dist' },
    templateFormats: ['html', 'md', 'liquid'],
    passthroughFileCopy: true,
  };
};
