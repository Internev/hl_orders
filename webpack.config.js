const path = require('path')

module.exports = {
  // the entry file for the bundle
  entry: path.join(__dirname, '/client/main.js'),

  // the bundle file we will get in the result
  output: {
    path: path.join(__dirname, '/client/dist'),
    filename: 'bundle.js'
  },

  module: {

    // apply loaders to files that meet given conditions
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      }
    }]
  }
}
