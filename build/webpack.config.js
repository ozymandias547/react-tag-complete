const webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var isBuildStatic = process.argv.filter(function (val) { return val === "--buildstatic" }).length > 0;


module.exports = {
  entry: './example/index.js',
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass')
      },
      {
        test: /\.css/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets:['react', 'es2015']
        }
      }
    ]
  },
  output: {
    filename: isBuildStatic ? 'example/bundle.js' : 'bundle.js'
  },
  plugins: [
    new ExtractTextPlugin(isBuildStatic ? 'example/bundle.css' : 'bundle.css')
  ]
};