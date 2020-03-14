const { series, parallel, src, dest, watch } = require('gulp');
const connect = require('gulp-connect');
const sass = require('gulp-sass');

function sassTask(done) {
    src('css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('css'));
    done();
}

function serveTask(done) {
    connect.server({
        root: './',
        livereload: true,
        port: 8000,
    }, function () { this.server.on('close', done) })
}

function reloadTask(done) {
    src('./*.html').pipe(connect.reload());
    done();
}

function watchTask(done) {
    watch('./*.html').on('change', (filepath) =>
        src(filepath, { read: false }).pipe(connect.reload()));
    watch('css/*.scss', series(sassTask, reloadTask));
    done();
}

module.exports.default = series(sassTask, parallel(serveTask, watchTask));

// gulp.task('sass', function () {
//     return gulp.src('css/*.scss')
//         .pipe(sass().on('error', sass.logError))
//         .pipe(gulp.dest('css'));
// });

// gulp.task('connect', function (done) {
//     connect.server({
//         root: './',
//         livereload: true
//     }, function () { this.server.on('close', done) });
// });

// function serveTask(done) {
//     connect.server({
//         root: 'public',
//         livereload: true,
//         port: 8000,
//     }, function () { this.server.on('close', done) })
// }

// gulp.task('watch', function () {
//     gulp.watch('css/*.scss').on('change', gulp.series('sass'));
//     gulp.watch('*.html').on('change', gulp.series('default'));
// });

// gulp.task('default', gulp.series(['sass', 'connect', 'watch']));

// gulp.task('default', gulp.series(['sass'], function () {
//     gulp.watch('css/*.scss').on('change', gulp.series('sass'));
//     gulp.src('./')
//         .pipe(webserver({
//             livereload: true,
//             directoryListing: false,
//             open: true
//         }));
// }));