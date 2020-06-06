const gulp = require('gulp');

const css = require('./gulp-tasks/styles.js');
const js = require('./gulp-tasks/scripts.js');
const manifest = require('./gulp-tasks/manifest.js');

function watch() {
  gulp.watch(
    'src/scss/**/*',
    gulp.series(css.clean, css.build, manifest.build)
  );
  gulp.watch('src/js/**/*', gulp.series(js.clean, js.build, manifest.build));
}

const clean = gulp.parallel([css.clean, js.clean, manifest.clean]);

const build = gulp.series([
  gulp.parallel([css.build, js.build]),
  manifest.build,
]);

module.exports = {
  clean: clean,
  build: build,
  watch: watch,
  'clean:css': css.clean,
  'clean:js': js.clean,
  'clean:manifest': manifest.clean,
  'build:css': css.build,
  'build:js': js.build,
  'build:manifest': manifest.build,
};
