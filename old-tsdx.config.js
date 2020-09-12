const copyAssets = require('rollup-plugin-copy-assets');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
        copyAssets({
          assets: [ "./src/css" ]
        })
    )
    return config;    
  }
}