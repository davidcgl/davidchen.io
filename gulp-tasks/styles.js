const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const del = require('del');

const gulp = require('gulp');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const rev = require('gulp-rev');
const size = require('gulp-size');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const sourcemaps = require('gulp-sourcemaps');

const SITE_CSS_DIR = 'src/site/assets/css';

function buildCss() {
  return (
    gulp
      // Compile SCSS -> CSS.
      .src('src/scss/main.scss')
      .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
      .pipe(size({ title: 'original', showFiles: true }))
      .pipe(gulp.dest(SITE_CSS_DIR))

      // Create a source map for the minified CSS.
      .pipe(sourcemaps.init())

      // Post-process, minify, and rename to main.min.css.
      .pipe(postcss([autoprefixer(), cssnano()]))
      .pipe(rename({ extname: '.min.css' }))

      // Append content hash to the filename for cache busting.
      // Example: main.min.css -> main-b3e3e0f222.min.css
      .pipe(rev())
      .pipe(size({ title: 'minified', showFiles: true }))
      .pipe(gulp.dest(SITE_CSS_DIR))

      // Write source map to src/site/assets/css.
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(SITE_CSS_DIR))
  );
}

function cleanCss() {
  return del([`${SITE_CSS_DIR}/*.css`, `${SITE_CSS_DIR}/*.css.map`]);
}

module.exports = {
  clean: cleanCss,
  build: buildCss,
};
