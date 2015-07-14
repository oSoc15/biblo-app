var gulp = require('gulp');
var sass = require('gulp-sass');
var coffee = require('gulp-coffee');
var jade = require('gulp-jade');
var gutil = require('gulp-util');

gulp.task('normalize', function(){
    gulp.src(['bower_components/normalize-css/normalize.css'])
        .pipe(gulp.dest('build/css'));
});

gulp.task('js', function(){
    gulp.src(['src/js/**/*'])
        .pipe(gulp.dest('build/js'));
});

gulp.task('jquery', function(){
    gulp.src(['bower_components/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('build/js'));
});

gulp.task('handlebars', function(){
    gulp.src(['bower_components/handlebars/handlebars.min.js'])
        .pipe(gulp.dest('build/js'));
});

gulp.task('scripts', function() {
    gulp.run('js');
    gulp.run('jquery');
    gulp.run('handlebars');
});

gulp.task('styles', function() {
    gulp.src(['src/sass/**/*.scss'])
        .pipe(sass().on('error', function(err){
            gutil.log(gutil.colors.red(err));
        }))
        .pipe(gulp.dest('build/css'));
    gulp.run('normalize');
});

gulp.task('content', function() {
    gulp.src(['src/jade/**/*.jade', '!src/jade/layouts/**'])
        .pipe(jade().on('error', function(err){
            gutil.log(gutil.colors.red(err))
        }))
        .pipe(gulp.dest('build'))
});

gulp.task('images', function() {
    gulp.src(['src/images/**/*'])
        .pipe(gulp.dest('build/images'))
});

gulp.task('default', function() {
    gulp.run('scripts', 'styles', 'content');

    gulp.watch('src/js/**', function(event) {
        gulp.run('scripts');
    });
    gulp.watch('src/sass/**', function(event) {
        gulp.run('styles');
    });
    gulp.watch('src/jade/**', function(event) {
        gulp.run('content');
    });
    gulp.watch('src/images/**', function(event) {
        gulp.run('images');
    });

});