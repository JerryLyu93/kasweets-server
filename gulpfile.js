var gulp = require('gulp')
var ts = require('gulp-typescript')
var tsProject = ts.createProject('./tsconfig.json')

gulp.task("default", function () {
    return gulp.src('app/**/*.ts')
        .pipe(tsProject())
        .js.pipe(gulp.dest('app'));
});

gulp.task('watch', ['default'], function() {
    gulp.watch('app/**/*.ts', ['default']);
});