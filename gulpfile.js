var gulp = require('gulp'),
    connect = require('gulp-connect');
const markdown = require('markdown-it')({
    html: true
});
const markdownattrs = require('markdown-it-attrs')
const rename = require('gulp-rename');
const fs = require('fs');
const map = require('map-stream');
const sass = require('gulp-sass');

markdown.use(markdownattrs);

gulp.task('sass', function () {
    return gulp.src('css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('css'));
});

gulp.task('connect', function () {
    connect.server({
        root: './',
        livereload: true
    });
});

gulp.task('watch', function () {
    gulp.watch('css/*.scss').on('change', gulp.series('sass'));
});

gulp.task('default', gulp.series(['sass', 'connect', 'watch']));

// gulp.task('default', gulp.series(['sass'], function () {
//     gulp.watch('css/*.scss').on('change', gulp.series('sass'));
//     gulp.src('./')
//         .pipe(webserver({
//             livereload: true,
//             directoryListing: false,
//             open: true
//         }));
// }));