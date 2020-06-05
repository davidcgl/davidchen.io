const del = require('del');
const fg = require('fast-glob');
const fs = require('fs');
const path = require('path');

const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);

const MANIFEST_FILE = 'src/site/_data/manifest.json';

async function buildManifest() {
  const files = await fg([
    `src/site/assets/css/*.min.css`,
    `src/site/assets/css/*.min.js`,
  ]);

  // Remove content hash from filename.
  // Example: main-b3e3e0f222.min.css -> main.min.css
  const source = (file) => file.replace(/-[a-zA-Z0-9]+\./g, '.');

  // Generate an asset manifest. Example:
  // {
  //   "main.min.css": "main-b3e3e0f222.min.css",
  //   "main.min.js": "main-046dfd0b.min.js",
  // }
  const manifest = files
    .map((file) => path.basename(file))
    .reduce((acc, file) => ({ ...acc, [source(file)]: file }), {});

  return writeFileAsync(MANIFEST_FILE, JSON.stringify(manifest));
}

function cleanManifest() {
  return del([MANIFEST_FILE]);
}

module.exports = {
  clean: cleanManifest,
  build: buildManifest,
};
