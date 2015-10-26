var gulp   = require('gulp');
var uglify = require('gulp-uglify');
var paths  = require('../config.js');

gulp.task('deploy', ['uglify', 'cssmin', 'imagemin']);
