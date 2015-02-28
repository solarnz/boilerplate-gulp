'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

module.exports = function(options) {
  gulp.task('serve', ['js', 'html'], function() {
    browserSync({
      server: {
        baseDir: 'build'
      }
    });

    var bower = require('../bower.json');
    gulp.watch(bower.main, ['js:src', reload]);
    gulp.watch(['./bower.json'], ['js', reload]);
    gulp.watch(options.views.src, ['html', reload]);
  });
};
