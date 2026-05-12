var del = require('del');
var gulp = require('gulp');
var path = require('path');
var argv = require('yargs').argv;
var log = require('fancy-log');
var colors = require('ansi-colors');
var source = require('vinyl-source-stream');
var buffer = require('gulp-buffer');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var exorcist = require('exorcist');
var babelify = require('babelify');
var browserify = require('browserify');
var browserSync = require('browser-sync').create();

var PHASER_PATH = './node_modules/phaser/build/';
var LIB_PATHS = [
    './node_modules/lodash/lodash.min.js'
];

var BUILD_PATH = './build';
var SCRIPTS_PATH = BUILD_PATH + '/scripts';
var SOURCE_PATH = './src';
var STATIC_PATH = './static';
var ENTRY_FILE = SOURCE_PATH + '/index.js';
var OUTPUT_FILE = 'game.js';

var keepFiles = false;

function isProduction() {
    return argv.production;
}

function logBuildMode() {
    if (isProduction()) {
        log(colors.green('Running production build...'));
    } else {
        log(colors.yellow('Running development build...'));
    }
}

function cleanBuild(done) {
    if (!keepFiles) {
        return del(['build/**/*.*']);
    } else {
        keepFiles = false;
        done();
    }
}

function copyStatic() {
    return gulp.src(STATIC_PATH + '/**/*')
        .pipe(gulp.dest(BUILD_PATH));
}

function copyLibs() {
    var srcList = ['phaser.min.js'];

    if (!isProduction()) {
        srcList.push('phaser.map', 'phaser.js');
    }

    srcList = srcList.map(function(file) {
        return PHASER_PATH + file;
    });

    for (var i=0; i<LIB_PATHS.length;i++) {
        srcList.push(LIB_PATHS[i]);
    }

    return gulp.src(srcList, { allowEmpty: true })
        .pipe(gulp.dest(SCRIPTS_PATH));
}

function build() {
    var sourcemapPath = SCRIPTS_PATH + '/' + OUTPUT_FILE + '.map';
    logBuildMode();

    return browserify({
        paths: [ path.join(__dirname, 'src') ],
        entries: ENTRY_FILE,
        debug: true
    })
    .transform(babelify, { presets: ['@babel/preset-env'] })
    .bundle().on('error', function(error){
          log(colors.red('[Build Error]', error.message));
          this.emit('end');
    })
    .pipe(gulpif(!isProduction(), exorcist(sourcemapPath)))
    .pipe(source(OUTPUT_FILE))
    .pipe(buffer())
    .pipe(gulpif(isProduction(), uglify()))
    .pipe(gulp.dest(SCRIPTS_PATH));
}

function serve(done) {
    browserSync.init({
        server: {
            baseDir: BUILD_PATH
        },
        notify: true,
        open: true
    });

    gulp.watch(SOURCE_PATH + '/**/*.js', gulp.series(build, function reload(done) {
        browserSync.reload();
        done();
    }));

    gulp.watch(STATIC_PATH + '/**/*', gulp.series(
        function setKeepFiles(done) { keepFiles = true; done(); },
        cleanBuild,
        copyStatic,
        copyLibs,
        function reload(done) {
            browserSync.reload();
            done();
        }
    ));

    done();
}

var buildPipeline = gulp.series(cleanBuild, copyStatic, copyLibs, build);

gulp.task('default', gulp.series(buildPipeline, serve));
gulp.task('production', gulp.series(buildPipeline));
