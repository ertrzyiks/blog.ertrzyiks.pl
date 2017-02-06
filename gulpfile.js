'use strict'

var gulp = require('gulp')
var sass = require('gulp-sass')
var rename = require('gulp-rename')

gulp.task('sass', function () {
  return gulp.src('./content/themes/nono/assets/sass/index.sass')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename('compiled.css'))
    .pipe(gulp.dest('./content/themes/nono/assets/css/'))
})

gulp.task('sass:watch', ['sass'], function () {
  gulp.watch('./content/themes/nono/assets/sass/**/*.sass', ['sass'])
})
