'use strict';

var gulp = require('gulp');

var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var mainBowerFiles = require('main-bower-files');

module.exports = function(options) {
  gulp.task('js:dependencies', function() {
    return gulp.src(mainBowerFiles({}, {base: 'bower_components'}))
              .pipe(sourcemaps.init())
              .pipe(concat('vendor.js'))
              .pipe(sourcemaps.write('./'))
              .pipe(gulp.dest(options.buildDir));
  });

  gulp.task('js:src', function() {
    var bower = require('../bower.json');
    return gulp.src(bower.main)
              .pipe(sourcemaps.init())
              .pipe(babel())
              .pipe(concat(options.name + '.js'))
              .pipe(sourcemaps.write('./'))
              .pipe(gulp.dest(options.buildDir));
  });

  gulp.task('js', ['js:dependencies', 'js:src']);
};
