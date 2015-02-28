'use strict';

var gulp = require('gulp');

module.exports = function(options) {
  gulp.task('html', function() {
    return gulp.src(options.views.src, {base: options.views.base})
               .pipe(gulp.dest(options.buildDir));
  });
};
