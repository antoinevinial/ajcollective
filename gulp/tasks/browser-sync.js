var gulp        = require('gulp');
var browserSync = require('browser-sync');
var path        = require('../config.js');

gulp.task('browser-sync', function() {
  browserSync({
    proxy: "ajcollective.dev/"
  });
});
