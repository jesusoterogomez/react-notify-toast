var gulp = require('gulp');
var config = require('../config').watch;
var watch = require('gulp-watch');
var vars = require('../config').vars;

gulp.task('watch', function() {
    watch(config.scripts.src, function() {
        gulp.start(config.scripts.tasks);
    });
});
