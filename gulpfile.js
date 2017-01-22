var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var webpack = require('gulp-webpack');


gulp.task('webpack', function() {
    gulp.src('./src/main.js')
        .pipe(webpack( require('./webpack.config.js') ))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('default',['webpack'], function() {
    nodemon({
        script: 'index.js'
        , ext: 'js html'
        , env: { 'NODE_ENV': 'development' }
    })
});