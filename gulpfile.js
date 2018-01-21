var gulp   = require('gulp'),
    jshint = require('gulp-jshint'),
	htmlreplace = require('gulp-html-replace'),
	 sourcemaps = require('gulp-sourcemaps'),
	 concat = require('gulp-concat'),
	 cleanCSS = require('gulp-clean-css'),
	 uglify = require('gulp-uglify'),
	 rename = require('gulp-rename');


gulp.task('default', ['watch']);


gulp.task('jshint', function() {
  return gulp.src('js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});


gulp.task('watch', function() {
  gulp.watch('js/**/*.js', ['jshint']);
});

gulp.task('build', ['build-js','replace-html','minify-css']);

gulp.task('replace-html', function() {
  gulp.src('index.html')
    .pipe(htmlreplace({
        'css': 'css/styles.min.css',
        'js': 'js/bundle.min.js'
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('build-js', function() {
  return gulp.src(['vendor/js/**/*.js','js/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'));
});

gulp.task('minify-css', function(){
  return gulp.src(['vendor/css/*.css','css/*.css'])
     .pipe(sourcemaps.init())
     .pipe(concat('styles.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/css'));
});