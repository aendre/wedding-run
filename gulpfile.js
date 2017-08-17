var del = require('del');
var gulp = require('gulp');
var path = require('path');
var argv = require('yargs').argv;
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('gulp-buffer');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var exorcist = require('exorcist');
var babelify = require('babelify');
var browserify = require('browserify');
var browserSync = require('browser-sync');

/**
 * Using different folders/file names? Change these constants:
 */
var PHASER_PATH = './node_modules/phaser/build/';
var LIB_PATHS = [
    './node_modules/lodash/lodash.min.js'
    ,'./node_modules/@orange-games/phaser-input/build/phaser-input.min.js'
    ,'./node_modules/jquery/dist/jquery.min.js'
];

var BUILD_PATH = './build';
var SCRIPTS_PATH = BUILD_PATH + '/scripts';
var SOURCE_PATH = './src';
var STATIC_PATH = './static';
var ENTRY_FILE = SOURCE_PATH + '/index.js';
var OUTPUT_FILE = 'game.js';

var keepFiles = false;

/**
 * Simple way to check for development/production mode.
 */
function isProduction() {
    return argv.production;
}

/**
 * Logs the current build mode on the console.
 */
function logBuildMode() {
    
    if (isProduction()) {
        gutil.log(gutil.colors.green('Running production build...'));
    } else {
        gutil.log(gutil.colors.yellow('Running development build...'));
    }

}

/**
 * Deletes all content inside the './build' folder.
 * If 'keepFiles' is true, no files will be deleted. This is a dirty workaround since we can't have
 * optional task dependencies :(
 * Note: keepFiles is set to true by gulp.watch (see serve()) and reseted here to avoid conflicts.
 */
function cleanBuild() {
    if (!keepFiles) {
        del(['build/**/*.*']);
    } else {
        keepFiles = false;
    }
}

/**
 * Copies the content of the './static' folder into the '/build' folder.
 * Check out README.md for more info on the '/static' folder.
 */
function copyStatic() {
    return gulp.src(STATIC_PATH + '/**/*')
        .pipe(gulp.dest(BUILD_PATH));
}

/**
 * Copies required Phaser files from the './node_modules/Phaser' folder into the './build/scripts' folder.
 * This way you can call 'npm update', get the lastest Phaser version and use it on your project with ease.
 */
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
            
    return gulp.src(srcList)
        .pipe(gulp.dest(SCRIPTS_PATH));

}

/**
 * Transforms ES2015 code into ES5 code.
 * Optionally: Creates a sourcemap file 'game.js.map' for debugging.
 * 
 * In order to avoid copying Phaser and Static files on each build,
 * I've abstracted the build logic into a separate function. This way
 * two different tasks (build and fastBuild) can use the same logic
 * but have different task dependencies.
 */
function build() {

    var sourcemapPath = SCRIPTS_PATH + '/' + OUTPUT_FILE + '.map';
    logBuildMode();

    return browserify({
        paths: [ path.join(__dirname, 'src') ],
        entries: ENTRY_FILE,
        debug: true
    })
    .transform(babelify)
    .bundle().on('error', function(error){
          gutil.log(gutil.colors.red('[Build Error]', error.message));
          this.emit('end');
    })
    .pipe(gulpif(!isProduction(), exorcist(sourcemapPath)))
    .pipe(source(OUTPUT_FILE))
    .pipe(buffer())
    .pipe(gulpif(isProduction(), uglify()))
    .pipe(gulp.dest(SCRIPTS_PATH));

}

/**
 * Starts the Browsersync server.
 * Watches for file changes in the 'src' folder.
 */
function serve() {
    
    var options = {
        server: {
            baseDir: BUILD_PATH
        },
        notify: true,
        open: true // Change it to true if you wish to allow Browsersync to open a browser window.
    };
    
    browserSync(options);
    
    // Watches for changes in files inside the './src' folder.
    gulp.watch(SOURCE_PATH + '/**/*.js', ['watch-js']);
    
    // Watches for changes in files inside the './static' folder. Also sets 'keepFiles' to true (see cleanBuild()).
    gulp.watch(STATIC_PATH + '/**/*', ['watch-static']).on('change', function() {
        keepFiles = true;
    });

}


gulp.task('cleanBuild', cleanBuild);
gulp.task('copyStatic', ['cleanBuild'], copyStatic);
gulp.task('copyLibs', ['copyStatic'], copyLibs);
gulp.task('build', ['copyLibs'], build);
gulp.task('fastBuild', build);
gulp.task('serve', ['build'], serve);
gulp.task('watch-js', ['fastBuild'], browserSync.reload); // Rebuilds and reloads the project when executed.
gulp.task('watch-static', ['copyLibs'], browserSync.reload);

/**
 * The tasks are executed in the following order:
 * 'cleanBuild' -> 'copyStatic' -> 'copyLibs' -> 'build' -> 'serve'
 * 
 * Read more about task dependencies in Gulp: 
 * https://medium.com/@dave_lunny/task-dependencies-in-gulp-b885c1ab48f0
 */
gulp.task('default', ['serve']);
