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

  config.addPassthroughCopy('src/site/assets');
  config.addPassthroughCopy(`src/site/apple-touch-icon.png`);
  config.addPassthroughCopy(`src/site/favicon-16x16.png`);
  config.addPassthroughCopy(`src/site/favicon-32x32.png`);
  config.addPassthroughCopy(`src/site/favicon.ico`);

  config.addCollection('posts', (collection) => {
    const now = new Date();
    return collection
      .getFilteredByGlob(`src/site/posts/*.md`)
      .filter((post) => !post.data.draft && post.date <= now)
      .reverse();
  });

  return {
    dir: { input: 'src/site', output: 'dist' },
    templateFormats: ['html', 'md', 'liquid'],
    passthroughFileCopy: true,
  };
};
