/*!
 * @author: Shaun Janssens
 * @copyright: open Summer of code
 */

// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    del = require('del');

// Html
gulp.task('html', function(){
    gulp.src(['src/html/**/*'])
        .pipe(gulp.dest('build'));
});

// Styles
gulp.task('styles', function() {
    return sass('src/styles/style.scss', { style: 'expanded' })
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('build/css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('build/css'));
});

// Scripts
gulp.task('scripts', function() {
    return gulp.src('src/scripts/**/*.js')
        //.pipe(jshint())
        //.pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

// Images
gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('build/img'));
});

// jQuery
gulp.task('jquery', function(){
    return gulp.src(['bower_components/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('build/js'));
});

// Handlebars
gulp.task('handlebars', function(){
    return gulp.src(['bower_components/handlebars/handlebars.min.js'])
        .pipe(gulp.dest('build/js'));
});

// TEMP Api files
gulp.task('api', function(){
    return gulp.src(['src/api/**/*'])
        .pipe(gulp.dest('build/api'));
});

// Clean
gulp.task('clean', function(cb) {
    del(['build/', 'build/css', 'build/js', 'build/img', 'build/api'], cb);
    gulp.start('html', 'styles', 'scripts', 'images', 'jquery', 'handlebars', 'api');
});

// Server
gulp.task('server', function(cb) {
    connect.server({
        root: 'build',
        livereload: true
    });
});

// Default task
gulp.task('default', ['html', 'styles', 'scripts', 'images', 'jquery', 'handlebars', 'api', 'server', 'watch']);

// Watch
gulp.task('watch', function() {
    // Watch .scss files
    gulp.watch('src/styles/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('src/scripts/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('src/images/**/*', ['images']);

    // Watch html files
    gulp.watch('src/html/**/*', ['html']);

    // Create LiveReload server
    livereload.listen();

    // Watch any files in build/, reload on change
    gulp.watch(['build/**']).on('change', livereload.changed);
});
