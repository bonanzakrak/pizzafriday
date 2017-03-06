var gulp = require('gulp');
var webpack2 = require('webpack');
//var watch = require('gulp-watch');
var webpackStream = require('webpack-stream');
var config = require('./webpack.config.js');
//var minify = require('gulp-minify');

gulp.task('react', function() {
  return gulp.src('src/index.js')
    .pipe(webpackStream(config ,webpack2))
    //.pipe(minify())
    .pipe(gulp.dest('server/dist/'));
});


gulp.task('watch', function() {
  gulp.watch(['src/**/*.js'], ['react']);

});

gulp.task('default', ['watch', 'react']);