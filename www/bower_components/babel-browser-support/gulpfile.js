var gulp = require('gulp');
var copy = require('gulp-copy');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var rename = require('gulp-rename');

var supportFiles = [
    'node_modules/babel-core/browser-polyfill.js',
    'node_modules/babel-core/external-helpers.js'
];

var srcFiles = [
    'src/browser-polyfill.js',
    'src/external-helpers.js'
];

gulp.task(
    'update:copyFiles',
    function () {
        gulp.src(supportFiles)
            .pipe(gulp.dest('src'));
        // gulp.src(srcFiles)
        //     .pipe(uglify())
        //     .pipe(gulp.dest('src'));
        // gulp.src(srcFiles)
        //     .pipe(concat('babel-support.js'))
        //     .pipe(gulp.dest('src'))
        //     .pipe(uglify())
        //     .pipe(gulp.dest('src/babel-support.min.js'));
    }
);

gulp.task(
    'update:concat',
    ['update:copyFiles'],
    function () {
        gulp.src(srcFiles)
            .pipe(concat('babel-support.js'))
            .pipe(gulp.dest('src'));
    }
);

gulp.task(
    'update:uglify',
    ['update:concat'],
    function () {
        gulp.src(['src/*.js', '!src/*.min.js'])
            .pipe(uglify())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('src'));
    }
);

gulp.task('update', ['update:uglify']);

