'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('default', ['lint', 'js', 'html'], function() {
});

gulp.task('html', function() {
  return gulp.src(['src/views/{*,}*.htm{,l}'], {base: 'src/views'})
      .pipe(gulp.dest('build'))
  ;
});

gulp.task('serve', ['js', 'html'], function() {
  browserSync({
    server: {
      baseDir: 'build'
    }
  });

  var bower = require('./bower.json');
  gulp.watch(bower.main, ['js:src', reload]);
  gulp.watch(['./bower.json'], ['js', reload]);
  gulp.watch(['src/views/{*,}*.htm{,l}'], ['html', reload]);
});

var options = {
  name: 'countdown',
  specFiles: ['src/scripts/{,*}.spec.js'],
  buildDir: 'build',
};

require('./gulp/js.js')(options);
require('./gulp/tests.js')(options);
require('./gulp/lint.js')(options);
