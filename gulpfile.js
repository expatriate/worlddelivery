var gulp = require('gulp');
var less = require('gulp-sass');
var concat = require('gulp-concat');

var gulpLoadPlugins = require('gulp-load-plugins');
var browserSync = require('browser-sync');
const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('css', function(){
  return gulp.src('client/templates/*.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/css'))
});

// Compile and automatically prefix stylesheets
gulp.task('styles', () => {
    const AUTOPREFIXER_BROWSERS = [
        'ie >= 10',
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 6',
        'opera >= 23',
        'ios >= 6',
        'android >= 4.4',
        'bb >= 10',
        'iOS 7'
    ];

    return gulp.src([
        'vendor/*.scss', 'css/*.scss'])
        .pipe($.sass())
        .pipe($.concat('main.css'))
        .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(gulp.dest('dist/css'))
});

// Copy all files at the root level (app)
gulp.task('copy', () => {
    gulp.src(['./*.html']).pipe(gulp.dest('dist'));
    gulp.src(['./img/*.jpg', './img/*.png']).pipe(gulp.dest('dist/img/'));
    gulp.src(['./fonts/*']).pipe(gulp.dest('dist/fonts'));
});

// Watch files for changes & reload
gulp.task('serve', ['styles', 'copy'], () => {
    browserSync({
        notify: false,
        // Customize the Browsersync console logging prefix
        logPrefix: 'WSK',
        // Allow scroll syncing across breakpoints
        scrollElementMapping: ['main', '.mdl-layout'],
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        server: './',
        port: 3000
    });

    gulp.watch(['*.html'], ['copy', reload]);
    gulp.watch(['css/*.{scss, css}'], ['styles', reload]);
    gulp.watch(['img/*.{png, jpg}'], ['copy', reload]);

});

gulp.task('default', [ 'html', 'css' ]);