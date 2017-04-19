var gulp = require('gulp')
var sass = require('gulp-sass')
var nunjucksRender = require('gulp-nunjucks-render')
var browserSync = require('browser-sync').create();



var inputPages     = 'app/pages/**/*.+(html|nunjucks|njk)';
var inputTemplates = 'app/templates/**/*.+(html|nunjucks|njk)';
/**
 * SASS TO CSS TASK
 *
 * 
 */
gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({
    stream: true
  }))
});

gulp.task('nunjucks', function(){
  //gets .html, .njk, .nunjuks files in pages
  return gulp.src(inputPages)
  .pipe(nunjucksRender({
    path: ['app/templates']
  }))
  .pipe(gulp.dest('app'))
});

gulp.task('browserSync', function(){
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})


gulp.task('watch', ['browserSync'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
  gulp.watch([inputPages, inputTemplates], ['nunjucks']);
  //other watchers
})
