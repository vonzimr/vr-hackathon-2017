var gulp = require('gulp')
var sass = require('gulp-sass')
var nunjucksRender = require('gulp-nunjucks-render')
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var source = require('vinyl-source-stream');


var inputPages     = 'src/pages/**/*.+(html|nunjucks|njk)';
var inputTemplates = 'src/templates/**/*.+(html|nunjucks|njk)';

gulp.task('sass', function(){
  return gulp.src('src/scss/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('dist/css'))
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
  .pipe(gulp.dest('dist'))
});

gulp.task('browserSync', function(){
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  })
})

gulp.task('browserify', function() {
    return browserify('./src/js/main.js')
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('bundle.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('watch', ['browserSync'], function (){
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('dist/*.html', browserSync.reload);
  gulp.watch('dist/js/*.js', browserSync.reload);
  gulp.watch('src/js/**/*.js', ['browserify']);
  gulp.watch([inputPages, inputTemplates], ['nunjucks']);
  //other watchers
})
