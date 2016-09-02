'use strict';

var path = require('path');
var bourbon = require('node-bourbon').includePaths;

module.exports = function(config) {

  config.set({
    frameworks: [
      'jasmine'
    ],
    files: [{
      pattern: path.normalize(process.cwd() + '/../src/**/*.spec.js')
    }],

    plugins: [
      require('karma-webpack'),
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-safari-launcher')
    ],

    reporters: ['dots'],
    port: 9876,
    colors: true,
    autoWatch: false,
    browsers: ['Chrome', 'Firefox', 'Safari'],
    singleRun: true,
    webpack: {
      cache: true,
      devtool: 'inline-source-map',
      module: {
        loaders: [{
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015']
          },
          test: /\.jsx?$/
        }, {
          test: /\.scss$/,
          loader: 'css-loader!sass?includePaths[]=' + bourbon
        }]
      }
    }

  });

  // Set preprocessors after the fact in order to have a dynamic key
  config.preprocessors[path.normalize(process.cwd() + '/../src/**/*.spec.js')] = ['webpack'];
  config.preprocessors[path.normalize(process.cwd() + '/../src/**/*.spec.jsx')] = ['webpack'];
};
