var gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    myth = require('gulp-myth'),
    csso = require('gulp-csso'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglifyjs'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync');

gulp.task('jade', function() {
  gulp.src(['!./src/jade/_inc/', './src/jade/*.jade'])
    .pipe(jade({
      pretty: true
    })).on('error', console.log)
    .pipe(gulp.dest('./demo/'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('sass', function() {
  gulp.src(['./src/sass/styles.sass', '!./src/sass/_*.sass'])
    .pipe(sass())
    .pipe(myth())
    .pipe(gulp.dest('./demo/css/'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('fonts', function() {
  gulp.src('./src/fonts/**/*')
    .pipe(gulp.dest('./demo/css/fonts'));
});

gulp.task('js', function() {
  gulp.src(['./src/js/**/*.js'])
    .pipe(concat('main.bundle.js'))
    .pipe(gulp.dest('./demo/js'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('images', function() {
  gulp.src('./src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./demo/img'));
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'demo'
    },
    notify: false
  });
});

gulp.task('default', ['browser-sync', 'sass', 'jade', 'js', 'images', 'fonts'], function() {
  gulp.watch('./src/sass/**/*.sass', ['sass']);
  gulp.watch('./src/jade/**/*.jade', ['jade']);
  gulp.watch('./src/js/**/*', ['js']);
});

// production
gulp.task('prod', function() {
  gulp.src('./demo/css/styles.css')
    .pipe(myth())
    .pipe(csso())
    .pipe(gulp.dest('./dist/css/'));
  gulp.src('./src/fonts/**/*')
    .pipe(gulp.dest('./dist/css/fonts'));
  gulp.src(['./src/jade/*.jade', '!./src/jade/_*.jade'])
    .pipe(jade())
    .pipe(gulp.dest('./dist/'));
  gulp.src('./demo/js/main.bundle.js')
    .pipe(uglify('main.bundle.min.js'))
    .pipe(gulp.dest('./dist/js/'));
  gulp.src('./src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'));
});
