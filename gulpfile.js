var gulp      = require('gulp'),
    flatten   = require('gulp-flatten'),
    sass      = require('gulp-sass'),
    usemin    = require('gulp-usemin'),
    wrap      = require('gulp-wrap'),
    concat    = require('gulp-concat'),
    connect   = require('gulp-connect'),
    watch     = require('gulp-watch'),
    uglify    = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css');

var paths = {
  js: 'src/js/*.*',
  fonts: 'src/fonts/**.*',
  images: 'src/img/**/*.*',
  styles: 'src/scss/*.scss',
  index: 'src/index.html',
  bower_fonts: 'src/bower_components/**/*.{ttf,woff,eof,svg}',
  bower_components: 'src/bower_components/**/*.*',
};


gulp.task('usemin', function() {
  return gulp.src(paths.index)
    .pipe(usemin({
      js: ['concat']
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('usemin:dist', function() {
  return gulp.src(paths.index)
    .pipe(usemin({
      js: ['concat', uglify()]
    }))
    .pipe(gulp.dest('dist/'));
});

/**
 * Copy assets
 */
gulp.task('copy-assets', ['copy-images', 'copy-fonts', 'copy-bower_fonts']);

gulp.task('copy-images', function(){
  return gulp.src(paths.images)
    .pipe(gulp.dest('dist/img'));
});

gulp.task('copy-fonts', function(){
  return gulp.src(paths.fonts)
    .pipe(flatten())
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('copy-bower_fonts', function(){
  return gulp.src(paths.bower_fonts)
    .pipe(flatten())
    .pipe(gulp.dest('dist/fonts'));
});

/**
 * Watch src
 */
gulp.task('watch', function () {
  gulp.watch([paths.styles, paths.index, paths.js], ['usemin']);
  gulp.watch([paths.styles], ['compile-sass']);
  gulp.watch([paths.images], ['copy-images']);
  gulp.watch([paths.fonts], ['copy-fonts']);
  gulp.watch([paths.bower_fonts], ['copy-bower_fonts']);
});

gulp.task('webserver', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

gulp.task('livereload', function() {
  gulp.src(['dist/**/*.*'])
    .pipe(watch())
    .pipe(connect.reload());
});

/**
 * Compile sass
 */
gulp.task('compile-sass', function(){
  return gulp.src(paths.styles)
      .pipe(sass())
      .pipe(concat('admin.css'))
      .pipe(gulp.dest('dist/src/'));
});

gulp.task('compile-sass:dist', function(){
  return gulp.src(paths.styles)
      .pipe(sass())
      .pipe(concat('admin.css'))
      .pipe(minifyCss())
      .pipe(gulp.dest('dist/src/'));
});

gulp.task('build', ['usemin:dist', 'copy-assets', 'compile-sass:dist']);
gulp.task('assets', ['usemin', 'copy-assets', 'compile-sass']);
gulp.task('default', ['assets', 'webserver', 'livereload', 'watch']);
