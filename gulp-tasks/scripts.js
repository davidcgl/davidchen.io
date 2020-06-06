const del = require('del');

const rollup = require('rollup');
const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');

const SITE_JS_DIR = 'src/site/assets/js';

async function buildJs() {
  const bundle = await rollup.rollup({
    input: 'src/js/main.js',
    plugins: [nodeResolve(), commonjs()],
  });

  return Promise.all([
    bundle.write({
      dir: SITE_JS_DIR,
      entryFileNames: '[name].js',
      format: 'iife',
      name: 'Main',
      sourcemap: false,
      plugins: [],
    }),
    bundle.write({
      dir: SITE_JS_DIR,
      entryFileNames: '[name]-[hash].min.js',
      format: 'iife',
      name: 'Main',
      sourcemap: true,
      plugins: [terser()],
    }),
  ]);
}

function cleanJs() {
  return del([`${SITE_JS_DIR}/*.js`, `${SITE_JS_DIR}/*.js.map`]);
}

module.exports = {
  clean: cleanJs,
  build: buildJs,
};
