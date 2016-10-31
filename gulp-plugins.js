/**
 * This file has been created for the plugins within our gulp file.
 * This is the last thing I wanted to do but all plugins have a little differnce and I want to cope with that.
 *
 * All the plugins will now be single functions and can be called customly.
 */
var gulp = require('gulp'),
    minify = require('gulp-clean-css'),
    postcss = require('gulp-postcss'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    autopref = require('gulp-autoprefixer'),
    concat = require('gulp-concat');

gulp.task('concat', function(done) {
    var config = global.config.plugins,
        output = global.config.output[project];

    return gulp.src(output + '/' + config.files)
        .pipe(concat(config.concat.config))
        .pipe(uglify(config.uglify.config))
        .pipe(gulp.dest(output));
});

gulp.task('uglify', function(done) {
    var config = global.config.plugins.uglify,
        output = global.config.output[project];

    return gulp.src(output + '/' + config.files)
        .pipe(uglify(config))
        .pipe(gulp.dest(output));
});