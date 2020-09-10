const cssOnly = require('rollup-plugin-css-only');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
        cssOnly({ output: './dist/jrad.css' })
    )
    return config;
  }
}