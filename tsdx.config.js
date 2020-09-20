const styles = require('rollup-plugin-styles');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
        styles({
            mode: ["extract", "jrad.css"],
        })
    )
    return config;
  }
}


