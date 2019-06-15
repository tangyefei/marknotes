var gulp = require('gulp'),
    // sass = require('gulp-ruby-sass'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload');

gulp.task('styles', function() {

  return gulp.src('css/main.less')
    .pipe(less({
      paths: [ __dirname ]
    }))

    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('watch', function() {
    gulp.watch('css/*.less', ['styles']);
     livereload.listen();
     gulp.watch(['css/*.css']).on('change', livereload.changed);
});

gulp.task('default', [], function() {
    gulp.start('watch');
});