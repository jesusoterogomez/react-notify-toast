var gulp = require('gulp');
var uglify = require('gulp-uglify');
var config = require('../config').build;

gulp.task('uglify', ['browserify'], function() {
    return gulp.src(config.js + '/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(config.js));
});
