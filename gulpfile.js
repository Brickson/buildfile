/******************/
/** Basic Imports */
/******************/

/**
 * Lets set some basic rules:
 * 1. When given on the cli --localhost then the styleguide is hosted on port 3000
 * 2. When project flags are given (prepended with "--") these projects are watched and built accordingly!
 *
 * The following tasks need to be ran on the following commands:
 * dev: move assets, move project related files, build sass, parse project related css files with postcss.
 * test: ImageOptim.
 * production: Uglify JS, Minify css/html).
 */

var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    config      = require(process.cwd() + '/config.json'),
    log         = require('gulp-util').log,
    tasks       = [],
    server      = false,
    projects    = process.argv.map(function(item) {
        if(item.indexOf('--') === -1) {
            return false;
        }

        item = item.replace(/-/g, '');
        if(item == 'server') {
            server = true;
            return false;
        }

        return item;
    }).filter(function(item) {
        return item;
    }),
    extras      = ['<link rel="stylesheet" type="text/css" href="/styles/screen.css">',
        '<script src="/javascript/html5shiv.min.js"></script>',
        '<script src="https://use.typekit.net/zaf1yku.js"></script>',
        '<script>try{Typekit.load({ async: true });}catch(e){}</script>',
        '<script src="//ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>',
        '<script src="/javascript/jquery.plugins.js"></script>',
        '<script src="/javascript/jquery.modules.js"></script>',
        '<script src="/javascript/picturefill.min.js" async></script>',
        '<script src="/javascript/pf.intrinsic.min.js" async></script>'];

// Leak config variable to global scope.
global.config = config;
require(process.cwd() + '/gulp-plugins');

/**
 * This task moves all the assets to the styleguide and www folders.
 */
gulp.task('assets', function() {
    var stream = gulp.src(config.source + '/assets/**/*')
        .pipe(gulp.dest(config.output.styleguide + '/assets'));

    for(var index in projects) {
        if(projects.hasOwnProperty(index)) {
            stream.pipe(gulp.dest(config.output[projects[index]] + '/assets'));
        }
    }

    return stream;
});

/**
 * This task will build all the css and run the registred tasks.
 */
gulp.task('build', function() {
    var stream = gulp.src(config.source + '/sass/screen.scss')
        .pipe(sass())
        .pipe(gulp.dest(config.output.styleguide + '/styles'));

    for(var index in projects) {
        if(projects.hasOwnProperty(index)) {
            // Leak variable
            global.project = projects[index];

            stream.pipe(gulp.dest(config.output[projects[index]] + '/styles'));
            gulp.start(tasks);
        }
    }
});

gulp.task('styleguide', function() {
    var styleguide = require('sc5-styleguide').generate({
        title: 'Brickson Pattern Library',
        rootPath: config.output.styleguide,
        server: server,
        overviewPath: config.source + '/overview.md',
        sideNav: true,
        previousSection: true,
        nextSection: true,
        disableHtml5Mode: true,
        extraHead: extras
    });

    gulp.src(config.source + '/sass/**/*.scss')
        .pipe(styleguide)
        .pipe(gulp.dest(config.output.styleguide));

    return gulp.src(config.source + '/sass/screen.scss')
        .pipe(sass())
        .pipe(require('sc5-styleguide').applyStyles())
        .pipe(gulp.dest(config.output.styleguide));
});

/**
 * This task will watch all the sass files and build the css/ minify and build the styleguide.
 */
gulp.task('dev', function() {
    tasks = ['imagemin', 'autopref'];

    gulp.start(['build', 'styleguide', 'assets']);
    gulp.watch(config.source + '/**/*', ['build', 'styleguide', 'assets']);
});

gulp.task('test', function() {
    tasks = tasks.concat(['concat']);
    gulp.start(['build', 'styleguide', 'assets']);
});

gulp.task('production', function() {
    tasks = tasks.concat(['postcss', 'minify']);
    gulp.start('test');
});
