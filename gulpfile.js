//////////////////////////////
// REQUIRE MODULES
//////////////////////////////

var gulp = require('gulp'),
    rename = require('gulp-rename'),    // Methods for renaming files
    uglify = require('gulp-uglify'),    // Minifies JS
    browserSync = require('browser-sync'), // Auto reload website
    reload = browserSync.reload,
    plumber = require('gulp-plumber'), // Prevents pipe from breaking when errors occur
    postcss = require('gulp-postcss'), // API for everything PostCSS
    precss = require('precss'), // Allows SASS like syntax inside CSS (PostCSS plugin)
    autoprefixer = require('autoprefixer'), // Adds browser prefixes automatically (PostCSS plugin)
    exec = require('child_process').exec; // To run flask process

//////////////////////////////
// TASKS
//////////////////////////////

// Styles Task - for all the awesome CSS
gulp.task('styles', function() {
    var processors = [
        //autoprefixer({browsers: ['last 2 version']}),
        precss({}),
        autoprefixer({})
    ];

    gulp.src('./static/css/raw/styles.css')
        .pipe(plumber())
        .pipe(postcss(processors))
        .pipe(gulp.dest('./static/css/'))
        .pipe(reload({stream: true}));
});

// Scripts Task - for everything JavaScript
gulp.task('scripts', function() {
    gulp.src(['./static/js/main.js', '!app/js/**/*.min.js'])
        .pipe(plumber())
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./static/js/'))
        .pipe(reload({stream: true}));
});

// HTML Task
gulp.task('html', function() {
    gulp.src('./static/**/*.html')
    .pipe(reload({stream: true}));
});

//////////////////////////////
// BROWSER SYNC TASKS
//////////////////////////////

// Run Flask server
gulp.task('runserver', function() {
    var proc = exec('python run.py');
});

gulp.task('browser-sync', function() {
    browserSync({
        notify: false,
        proxy: '127.0.0.1:5000'
    })
});


//////////////////////////////
// WATCH TASKS
//////////////////////////////

gulp.task('watch', function() {
    gulp.watch('./static/css/raw/**/*.css', ['styles']);
    gulp.watch('./static/js/main.js', ['scripts']);
    gulp.watch('./static/**/*.html', ['html']);
});

//////////////////////////////
// DIST TASKS
//////////////////////////////

gulp.task('dist', function() {
    gulp.src('./static/**/*.html')
    .pipe(gulp.dest('./dist/'));

    gulp.src('./static/js/**/*min.js')
    .pipe(gulp.dest('./dist/js/'));

    gulp.src('./static/css/styles.css')
    .pipe(gulp.dest('./dist/css'));
});


//////////////////////////////
// DEFAULT TASKS
//////////////////////////////

gulp.task('default', ['styles', 'scripts', 'html', 'runserver', 'browser-sync', 'watch']);
