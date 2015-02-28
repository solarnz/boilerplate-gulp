'use strict';

var gulp = require('gulp');

var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var mainBowerFiles = require('main-bower-files');
var rev = require('gulp-rev');

module.exports = function(options) {
  gulp.task('js:dependencies', function() {
    var pipeline =  gulp.src(mainBowerFiles({}, {base: 'bower_components'}))
                        .pipe(sourcemaps.init())
                        .pipe(concat('vendor.js'))
                        .pipe(rev())
                        .pipe(sourcemaps.write('./'))
                        .pipe(gulp.dest(options.buildDir));

    if (options.version) {
      pipeline = pipeline.pipe(rev.manifest({
        base: options.buildDir,
        merge: true // merge with the existing manifest (if one exists)
      }))
      .pipe(gulp.dest(options.buildDir));
    }

    return pipeline;
  });

  gulp.task('js:src', function() {
    var bower = require('../bower.json');
    var pipeline = gulp.src(bower.main)
                       .pipe(sourcemaps.init())
                       .pipe(babel())
                       .pipe(concat(options.name + '.js'));
    if (options.version) {
      pipeline = pipeline.pipe(rev());
    }

    pipeline = pipeline.pipe(sourcemaps.write('./'))
                       .pipe(gulp.dest(options.buildDir));

    if (pipeline) {
      pipeline = pipeline.pipe(rev.manifest({
        base: options.buildDir,
        merge: true // merge with the existing manifest (if one exists)
      }))
      .pipe(gulp.dest(options.buildDir));
    }

    return pipeline;
  });

  gulp.task('js', ['js:dependencies', 'js:src']);
};
