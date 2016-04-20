'use strict';

// [1] Require gulp
var gulp        = require( 'gulp' );

// [2] Load plug-ins
var $           = require( 'gulp-load-plugins' )( );
var uglify      = require( 'gulp-uglify' );
var vulcanize   = require( 'gulp-vulcanize' );
var crisper     = require( 'gulp-crisper' );
var runSequence = require('run-sequence');

// [3] Default task - run with 'gulp'
gulp.task( 'default', function( cb ) {
  runSequence(
     [ 'build', 'copy' ],
     'compress',
    cb );
} );

gulp.task( 'compress', function( ) {
  gulp.src( [ 'elements/prod/elements.js' ] )
    .pipe( uglify( ) )
    .pipe( gulp.dest( 'elements/prod/' ) );
} );

gulp.task( 'copy', function( ) {
  gulp.src( [ 'elements/weather/flags/**/*' ] ).pipe( gulp.dest( 'elements/prod/weather/flags' ) );
  gulp.src( [ 'elements/weather/meteocons-font/**/*' ] ).pipe( gulp.dest( 'elements/prod/weather/meteocons-font' ) );
  gulp.src( [ 'elements/weather/SVG/**/*' ] ).pipe( gulp.dest( 'elements/prod/weather/SVG' ) );
} );

/* npm install -g vulcanize (will prodify polymer components)
   npm install -g gulp-crisper
   CLI: vlucanize dir/to/your/elements.html (will traverse the imports and concat them into a single file to reduce http requests)
   Manual way to output to file:
    mkdir -p a/new/path
    vulcanize dir/to/your/elements.html > a/new/path/elements.html 'OR'
    vulcanize dir/to/your/elements.html -o a/new/path/elements.html --inline-scripts --inline-css --strip-comments

   Through GULP
    npm install --save-dev gulp gulp-vulcanize
    */
gulp.task( 'build', function( ) {
  return gulp.src( 'elements/elements.html' ).pipe( vulcanize( {
    stripComments : true,
    inlineScripts : true,
    inlineCss     : true
  } ) )
  .pipe( crisper( ) )
  .pipe( gulp.dest( 'elements/prod/' ) );
} );
