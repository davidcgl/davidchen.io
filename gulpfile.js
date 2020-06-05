const gulp = require('gulp');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const realFavicon = require('gulp-real-favicon');
const rev = require('gulp-rev');
const size = require('gulp-size');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const sourcemaps = require('gulp-sourcemaps');

const rollup = require('rollup');
const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const del = require('del');
const fg = require('fast-glob');
const fs = require('fs');
const path = require('path');

const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);

const paths = require('./paths');

gulp.task('build:css', () => {
  return (
    gulp
      // Compile SCSS -> CSS.
      .src('src/scss/main.scss')
      .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
      .pipe(size({ title: 'original', showFiles: true }))
      .pipe(gulp.dest(paths.siteCssDir))

      // Create a source map for the minified CSS.
      .pipe(sourcemaps.init())

      // Post-process, minify, and rename to main.min.css.
      .pipe(postcss([autoprefixer(), cssnano()]))
      .pipe(rename({ extname: '.min.css' }))

      // Append content hash to the filename for cache busting.
      // Example: main.min.css -> main-b3e3e0f222.min.css
      .pipe(rev())
      .pipe(size({ title: 'minified', showFiles: true }))
      .pipe(gulp.dest(paths.siteCssDir))

      // Write source map to src/site/assets/css.
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.siteCssDir))
  );
});

gulp.task('build:js', async () => {
  const bundle = await rollup.rollup({
    input: 'src/js/main.js',
    plugins: [nodeResolve(), commonjs()],
  });

  return Promise.all([
    bundle.write({
      dir: paths.siteJsDir,
      entryFileNames: '[name].js',
      format: 'iife',
      name: 'Main',
      sourcemap: false,
      plugins: [],
    }),
    bundle.write({
      dir: paths.siteJsDir,
      entryFileNames: '[name]-[hash].min.js',
      format: 'iife',
      name: 'Main',
      sourcemap: true,
      plugins: [terser()],
    }),
  ]);
});

gulp.task('build:manifest', async () => {
  const cssFiles = await fg(`${paths.siteCssDir}/**/*.css`);
  const jsFiles = await fg(`${paths.siteJsDir}/**/*.js`);

  // Remove content hash from filename.
  // Example: main-b3e3e0f222.min.css -> main.min.css
  const source = (filename) => filename.replace(/-[a-zA-Z0-9]+\./g, '.');

  // Generate an asset manifest.
  // Example: {
  //   "main.css": "main.css",
  //   "main.min.css": "main-b3e3e0f222.min.css",
  //   "main.js": "main.js",
  //   "main.min.js": "main-046dfd0b.min.js",
  // }
  const manifest = [...cssFiles, ...jsFiles]
    .map((filename) => path.basename(filename))
    .reduce((acc, filename) => ({ ...acc, [source(filename)]: filename }), {});

  return writeFileAsync(paths.assetManifestFile, JSON.stringify(manifest));
});

gulp.task('build', async () => {
  gulp.series([
    'clean',
    gulp.parallel(['build:css', 'build:js']),
    'build:manifest',
  ])();
});

gulp.task('clean:css', () => {
  return del([`${paths.siteCssDir}/*.css`, `${paths.siteCssDir}/*.css.map`]);
});

gulp.task('clean:js', () => {
  return del([`${paths.siteJsDir}/*.js`, `${paths.siteJsDir}/*.js.map`]);
});

gulp.task('clean:manifest', () => {
  return del([paths.assetManifestFile]);
});

gulp.task('clean', async () => {
  return gulp.parallel(['clean:css', 'clean:js', 'clean:manifest'])();
});

gulp.task('watch', async () => {
  gulp.watch(
    'src/scss/**/*',
    gulp.series(['clean:css', 'build:css', 'build:manifest'])
  );
  gulp.watch(
    'src/js/**/*',
    gulp.series(['clean:js', 'build:js', 'build:manifest'])
  );
});

// From RealFaviconGenerator:
// https://realfavicongenerator.net/favicon_result?file_id=p1ea18tmeaobk3uiu0e1oo1soh6#.XtnHF55KhTY
gulp.task('generate:favicon', (done) => {
  realFavicon.generateFavicon(
    {
      masterPicture: 'src/logo/logo.svg',
      dest: paths.siteDir,
      iconsPath: '/',
      design: {
        ios: {
          pictureAspect: 'backgroundAndMargin',
          backgroundColor: '#ffffff',
          margin: '18%',
          assets: {
            ios6AndPriorIcons: false,
            ios7AndLaterIcons: false,
            precomposedIcons: false,
            declareOnlyDefaultIcon: true,
          },
        },
        desktopBrowser: {
          design: 'raw',
        },
        windows: {
          pictureAspect: 'noChange',
          backgroundColor: '#00aba9',
          onConflict: 'override',
          assets: {
            windows80Ie10Tile: false,
            windows10Ie11EdgeTiles: {
              small: false,
              medium: true,
              big: false,
              rectangle: false,
            },
          },
        },
        androidChrome: {
          pictureAspect: 'noChange',
          themeColor: '#ffffff',
          manifest: {
            display: 'standalone',
            orientation: 'notSet',
            onConflict: 'override',
            declared: true,
          },
          assets: {
            legacyIcon: false,
            lowResolutionIcons: false,
          },
        },
        safariPinnedTab: {
          pictureAspect: 'blackAndWhite',
          threshold: 92.34375,
          themeColor: '#5bbad5',
        },
      },
      settings: {
        compression: 1,
        scalingAlgorithm: 'Mitchell',
        errorOnImageTooSmall: false,
        readmeFile: false,
        htmlCodeFile: false,
        usePathAsIs: false,
      },
      markupFile: `${paths.siteDataDir}/favicon.json`,
    },
    function () {
      done();
    }
  );
});
