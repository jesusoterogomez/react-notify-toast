var dest = './bin';
var src = './src';
var utils = require('gulp-util');
var name = '../package.json'.name;

module.exports = {
    vars: {
        buildError: null
    },
    browserify: {
        settings: {
            expose: name,
            transform: ['babelify', 'reactify'],
            extensions: ['.jsx', '.js', '.json'],
            paths: [
                "./node_modules",
                "./src/"
            ]
        },
        src: src + '/notification.js',
        dest: dest,
        outputName: 'notify-bundle.js',
        debug: utils.devMode
    },
    watch: {
        scripts: {
            src: [
                src + '/**/*.{js,jsx,json}'
            ],
            tasks: ['browserify']
        }
    }
};
