const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'none',
  entry: {
    'index': './index.js'
  },
  output: {
    filename: '[name].bundle.js',
  }
}