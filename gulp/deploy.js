'use strict';

var gulp = require('gulp');
var rimraf = require('rimraf');
var s3 = require('gulp-s3');

module.exports = function(options) {
  gulp.task('deploy', function() {
    // Modify options so that we output to where we want to.
    options.buildDir = 'prod';
    options.version = true;

    var awsSettings = {
      key: process.env.AWS_ACCESS_KEY_ID,
      secret: process.env.AWS_SECRET_ACCESS_KEY,
      bucket: process.env.AWS_BUCKET,
      region: process.env.AWS_REGION,
    };

    rimraf(options.buildDir, function() {
      gulp.start(['default'], function() {
        var sources = [
          options.buildDir + '/**',
          '!' + options.buildDir + '/**/*.map'
        ];

        return gulp.src(sources, {base: ''})
                   .pipe(s3(awsSettings));
      });
    });
  });
};
