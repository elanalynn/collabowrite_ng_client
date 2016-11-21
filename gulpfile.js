const gulp = require('gulp')
const sass = require('gulp-sass')
const concatCss = require('gulp-concat-css')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const minify = require('gulp-minify')

gulp.task('styles', () => {
  gulp.src('./src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concatCss('styles.css'))
    .pipe(gulp.dest('./public/stylesheets/'))
})

gulp.task('scripts', function() {
  gulp.src('./src/**/*.js')
    .pipe(babel({presets: ['es2015']}))
    .pipe(concat('scripts.js'))
    .pipe(minify())
    .pipe(gulp.dest('./public/javascripts/'))
})

gulp.task('watch', function() {
  gulp.watch('./src/scss/*.scss', ['styles'])
  gulp.watch('./src/javascripts/**/*.js', ['babel'])
  gulp.watch('./src/javascripts/**/*.js', ['minify'])
})

gulp.task('default', ['styles', 'scripts'])
