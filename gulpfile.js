'use strict';

var gulp = require('gulp');

var options = {
  name: 'countdown',
  specFiles: ['src/scripts/{,*}.spec.js'],
  views: {
    src: ['src/views/{,*/}*.htm{,l}'],
    base: 'src/views/'
  },
  buildDir: 'build',
  version: false,
};

require('./gulp/deploy.js')(options);
require('./gulp/html.js')(options);
require('./gulp/js.js')(options);
require('./gulp/lint.js')(options);
require('./gulp/serve.js')(options);
require('./gulp/tests.js')(options);

gulp.task('default', ['lint', 'test', 'js', 'html']);
