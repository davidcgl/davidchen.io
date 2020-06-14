---
title: Lorem Ipsum
draft: true
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel pretium
risus, eu laoreet lectus. Vivamus [vitae diam](/) nec justo
malesuada dignissim eleifend sed orci. Maecenas leo turpis, tempor ac
vestibulum sit amet, ultrices quis ante. Vestibulum justo nisl, venenatis
eget rutrum scelerisque, ullamcorper nec urna.

<img src="https://picsum.photos/600/400" alt="placeholder" width="600" height="400" />

Lorem ipsum dolor sit amet, consectetur adipiscing
elit. [Donec a mattis sem](/), non fringilla lacus. Quisque accumsan nisl ut dui
pulvinar commodo. Donec fermentum malesuada augue sed imperdiet. Nulla
facilisi. Sed consequat condimentum molestie. Nunc et porta neque. Sed vitae
lacus condimentum, imperdiet erat sed, condimentum ante. Nunc posuere
fringilla dapibus. Fusce ligula magna, pulvinar ut dolor a, aliquet facilisis
nisl.

## Another heading here

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel imperdiet
leo. Morbi posuere ullamcorper libero, convallis elementum erat accumsan vel.
Praesent mattis tincidunt ex, eu malesuada tellus lacinia et.

This is my `.eleventy` config.

```js
const htmlmin = require('html-minifier');
const markdownIt = require('markdown-it');
const moment = require('moment');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = (config) => {
  config.setLibrary(
    'md',
    markdownIt({
      html: true,
      linkify: true,
      typographer: true,
    })
  );

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

  config.addFilter('moment', (date, format) => {
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
```

This is some Ruby code, for fun and profit.

```ruby
class Greeter
  def initialize(name)
    @name = name.capitalize
  end

  # This is a comment.
  def salute
    puts "Hello #{@name}!"
  end
end

g = Greeter.new("world")
g.salute
```

## Some heading here

Pellentesque iaculis ipsum ornare nunc suscipit ultricies. Ut ultricies
tortor velit, maximus aliquam mi commodo sit amet. Nam placerat lacinia
tincidunt. Integer consectetur ullamcorper est eget sollicitudin. Nunc eu
erat at elit tempor porta at molestie risus. Duis eget quam ac ex placerat
pretium.

> All money is a matter of belief. The real tragedy of the poor is the poverty
> of their aspirations. It is not from the benevolence of the butcher, the
> brewer, or the baker that we expect our dinner, but from their regard to
> their own interest.
>
> -- Adam Smith

**Mauris ornare lacinia quam, non lobortis velit vulputate non**. Donec magna
metus, venenatis in ligula euismod, rhoncus varius ligula. Sed sit amet augue
augue. Nam venenatis viverra mauris, in tincidunt quam suscipit id.
Suspendisse fringilla lacus vel lectus tempus, ut tincidunt dolor dapibus. In
sit amet euismod nulla, sed venenatis turpis.

## Final words

Phasellus porta ac nunc aliquet ultricies. Duis vel dolor leo. Proin
scelerisque leo eu metus congue, sed sodales purus consequat. Vestibulum ante
ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc
lobortis, neque vitae molestie pharetra, magna metus iaculis ante, quis
molestie augue arcu at ante. Curabitur a velit egestas, tempus dolor et,
imperdiet velit.
