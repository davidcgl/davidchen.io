const paths = require('./paths.js');

module.exports = (config) => {
  const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
  config.addPlugin(syntaxHighlight);

  const htmlmin = require('html-minifier');
  config.addTransform('htmlmin', (content, outputPath) => {
    if (outputPath.endsWith('.html')) {
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

  config.addCollection('post', (collection) => {
    return collection.getFilteredByGlob(`${paths.siteDir}/posts/*.md`);
  });

  return {
    dir: { input: paths.siteDir, output: 'dist' },
    templateFormats: ['html', 'md', 'liquid'],
    passthroughFileCopy: true,
  };
};
