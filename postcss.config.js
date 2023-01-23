const postcssPresetEnv = require('postcss-preset-env');
const postcssNested = require('postcss-nested');

module.exports = {
  plugins: [
    postcssPresetEnv(),
    postcssNested(),
  ],
};
