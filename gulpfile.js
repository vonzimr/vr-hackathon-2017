var gulp = require('gulp')
var sass = require('gulp-sass')
var nunjucksRender = require('gulp-nunjucks-render')
var browserSync = require('browser-sync').create();
var browserify = require('gulp-browserify');

var inputPages     = 'src/pages/**/*.+(html|nunjucks|njk)';
var inputTemplates = 'src/templates/**/*.+(html|nunjucks|njk)';
/**
 * SASS TO CSS TASK
 *
 * 
 */
gulp.task('sass', function(){
  return gulp.src('src/scss/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('src/css'))
  .pipe(browserSync.reload({
    stream: true
  }))
});

gulp.task('nunjucks', function(){
  //gets .html, .njk, .nunjuks files in pages
  return gulp.src(inputPages)
  .pipe(nunjucksRender({
    path: ['src/templates']
  }))
  .pipe(gulp.dest('src'))
});

gulp.task('browserSync', function(){
  browserSync.init({
    server: {
      baseDir: 'src'
    },
  })
})

gulp.task('scripts', function() {
    // Single entry point to browserify 
    gulp.src('src/js/app.js')
        .pipe(browserify({
          insertGlobals : true,
          debug : !gulp.env.production
        }))
        .pipe(gulp.dest('./build/js'))
});


gulp.task('watch', ['browserSync'], function (){
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('jsrc/js/**/*.js', browserSync.reload);
  gulp.watch([inputPages, inputTemplates], ['nunjucks']);
  //other watchers
})
