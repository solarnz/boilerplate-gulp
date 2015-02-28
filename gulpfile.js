'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var mainBowerFiles = require('main-bower-files');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var jshint = require('gulp-jshint');
var reload = browserSync.reload;

gulp.task('default', ['lint', 'js', 'html'], function() {
});

gulp.task('js:dependencies', function() {
  return gulp.src(mainBowerFiles({}, {base: 'bower_components'}))
             .pipe(sourcemaps.init())
             .pipe(concat('vendor.js'))
             .pipe(sourcemaps.write('./'))
             .pipe(gulp.dest('build'));
});

gulp.task('js:src', function() {
  var bower = require('./bower.json');
  return gulp.src(bower.main)
             .pipe(sourcemaps.init())
             .pipe(babel())
             .pipe(concat('countdown.js'))
             .pipe(sourcemaps.write('./'))
             .pipe(gulp.dest('build'));
});

gulp.task('js', ['js:dependencies', 'js:src']);

gulp.task('lint', ['lint:js']);
gulp.task('lint:js', function() {
  var bower = require('./bower.json');
  return gulp.src(bower.main)
             .pipe(jshint())
             .pipe(jshint.reporter('jshint-stylish'))
             .pipe(jshint.reporter('fail'))
  ;
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
