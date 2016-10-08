const gulp = require('gulp')
const sass = require('gulp-sass')
// const concat = require('gulp-concat')
// const minify = require('gulp-minify')

gulp.task('default', ['styles']) //, 'js'

gulp.task('styles', () => {
  return gulp.src('./src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/stylesheets/'))
})

// gulp.task('js', () => {
//   return gulp.src('./src/javascripts/**/*.js')
//     .pipe(concat('scripts.js'))
//     .pipe(minify())
//     .pipe(gulp.dest('./public/javascripts/'))
// })
