'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync');
const del = require('del');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const gulpIf = require('gulp-if');
const gcmq = require('gulp-group-css-media-queries');


const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

gulp.task('css', () => {
  return gulp.src('./src/**/*.css')
    .pipe(gulpIf(isDev, sourcemaps.init()))
    .pipe(concat('index.css'))
    .pipe(gulpIf(!isDev, autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    })))
    .pipe(gulpIf(!isDev, gcmq()))
    .pipe(gulpIf(!isDev, cleanCSS({compatibility: 'ie10'})))
    .pipe(gulpIf(isDev, sourcemaps.write()))
    .pipe(gulp.dest('./public'));
});

gulp.task('js', () => {
  return gulp.src('./src/**/*.js')
    .pipe(gulpIf(isDev, sourcemaps.init()))
    .pipe(concat('index.js'))
    .pipe(gulpIf(!isDev, uglify()))
    .pipe(gulpIf(isDev, sourcemaps.write()))
    .pipe(gulp.dest('./public'))
});

gulp.task('assets:html', () => {
  return gulp.src('./assets/**/*.html', { since: gulp.lastRun('assets:html') })
    .pipe(gulp.dest('./public'));
});

gulp.task('clean', () => {
  return del('./public');
});

gulp.task('build', gulp.series(
  'clean', gulp.parallel('css', 'assets:html', 'js'))
);

gulp.task('watch', () => {
  gulp.watch('./src/**/*.css', gulp.series('css'));
  gulp.watch('./src/**/*.js', gulp.series('js'));
  gulp.watch('./assets/**/*.html', gulp.series('assets:html'));
});

gulp.task('serve', () => {
  browserSync.init({
    server: 'public'
  });
  
  browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));

gulp.task('default', gulp.series('build'));