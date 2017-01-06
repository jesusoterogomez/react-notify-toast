var gulp = require('gulp');
var config = require('../config').vars;

gulp.task('build', ["browserify"], function() {
    if (config.dev) {
        return;
    }

    console.log("Build Successful");
    process.exit(0);
});

gulp.task('build:prod', ["uglify"], function() {
    if (config.dev) {
        return;
    }

    console.log("Production Build Successful");
    process.exit(0);
});
