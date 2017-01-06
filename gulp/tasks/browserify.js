var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var config = require('../config').browserify;
var babelify = require('babelify');
var vars = require('../config').vars;


function logError(e) {
    if (e.message !== vars.buildError) {
        console.log(e.message);
        console.log(e.codeFrame);
    }

    vars.buildError = e.message;
    this.emit('end');
}


gulp.task('browserify', function() {
    vars.buildError = null;
    return browserify(config.settings)
        .require(config.src, {expose: 'react-notify-toast'})
        .transform(babelify)
        .bundle()
        .on('error', logError)
        .pipe(source(config.outputName))
        .pipe(gulp.dest(config.dest));
});
