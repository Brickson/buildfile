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
    concat = require('gulp-concat'),
    rename = require('gulp-rename');

function loop(array, callback) {
    var promises = [];

    for(var index in array) {
        if(array.hasOwnProperty(index)) {
            promises.push(new Promise(function(resolve, reject) {
                var stream = callback(array[index]);
                stream.on('end', function() {
                    return resolve(true);
                });
                stream.on('error', function(err) {
                    return reject(err);
                });
            }));
        }
    }

    return Promise.all(promises);
}

gulp.task('concat', ['assets'], function(done) {
    return loop(projects, function(project) {
        var config = global.config.plugins.concat,
            output = global.config.output[project];

        return gulp.src(output + '/' + config.files)
            .pipe(concat(config.config))
            .pipe(gulp.dest(output));
    });
});

gulp.task('uglify', ['concat'] ,function() {
    return loop(projects, function(project) {
        var config = global.config.plugins.uglify,
            output = global.config.output[project];

        return gulp.src(output + '/' + config.files)
            .pipe(uglify())
            .pipe(gulp.dest(output + '/javascript'));
    });
});

gulp.task('imagemin', ['assets'], function() {
    return loop(projects, function(project) {
        var config = global.config.plugins.imagemin,
            output = global.config.output[project],
            folders = config.files.map(function(item) {
                return output + '/' + item;
            });

        return gulp.src(folders)
            .pipe(imagemin(config.config))
            .pipe(gulp.dest(output));
    });
});

gulp.task('autopref', ['build'], function() {
    return loop(projects, function(project) {
        var config = global.config.plugins.autopref,
            output = global.config.output[project];

        return gulp.src(output + '/' + config.files)
            .pipe(autopref(config.config))
            .pipe(gulp.dest(output));
    });
});

gulp.task('minify', ['build'], function() {
    return loop(projects, function(project) {
        var config = global.config.plugins.minify,
            output = global.config.output[project];

        return gulp.src(output + '/' + config.files)
            .pipe(minify(config.config))
            .pipe(gulp.dest(output));
    });
});