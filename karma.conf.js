'use strict';
module.exports = function(config) {
  config.set({
    basePath: './',
    frameworks: ['mocha', 'sinon-chai'],
    browsers: ['PhantomJS'],
    preprocessors: {
      'src/**/*.js': ['babel'],
      'src/**/!(*.spec|*.mock)+(.js)': ['coverage']
    },
    'babelPreprocessor': {
      options: {
        sourceMap: 'inline',
      }
    },
    coverageReporter: {
      type : 'html',
      dir : 'coverage/',
    },
  });
};
