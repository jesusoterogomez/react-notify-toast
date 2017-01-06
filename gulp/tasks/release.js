var gulp = require('gulp');
var git = require('gulp-git');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var run = require('run-sequence');
var version = require('../../package.json').version;

// Split Version Numbers
var versionArray = version.split('.');

// Define version numbers.
var major = versionArray[0];
var minor = versionArray[1];
var patch = versionArray[2];

function increment(versionNumber) {
    return parseInt(versionNumber, 10) + 1;
}

function getVersionNumber() {
    return major + '.' + minor + '.' + patch;
}

// Update Patch Version
gulp.task('release:patch', function() {
    patch = increment(patch);
    gulp.start('update:release');
});

// Update Minor Version
gulp.task('release:minor', function() {
    patch = increment(minor);
    gulp.start('update:release');
});

// Update Major Version
gulp.task('release:major', function() {
    patch = increment(major);
    gulp.start('update:release');
});

// Update Package.json
gulp.task('update:package', function() {
    gulp.src(['package.json'])
        .pipe(replace(
            '"version": "' + version + '"',
            '"version": "' + getVersionNumber() + '"')
        )
        .pipe(rename('package.json'))
        .pipe(gulp.dest('.'));
});

// Git Add package.json
gulp.task('git:add:package', function() {
    return gulp.src('package.json')
        .pipe(git.add());
});

// Git Commit Package.json
gulp.task('git:commit:release', function() {
    return gulp.src('package.json')
        .pipe(git.commit('Updated package.json version to ' + getVersionNumber()));
});

gulp.task('update:release', function() {
    run(
        'update:package',
        'git:add:package',
        'git:commit:release'
    );
});

