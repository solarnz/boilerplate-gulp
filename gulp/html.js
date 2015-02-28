'use strict';

var gulp = require('gulp');
var revReplace = require('gulp-rev-replace');

module.exports = function(options) {
  gulp.task('html', ['js'], function() {
    var manifest = gulp.src(['rev-manifest.json']);

    var pipeline = gulp.src(options.views.src, {base: options.views.base});
    if (options.version) {
      pipeline = pipeline.pipe(revReplace({manifest: manifest}));
    }

    return pipeline.pipe(gulp.dest(options.buildDir));
  });
};
