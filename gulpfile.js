const gulp = require("gulp");
const tsGulp = require("gulp-typescript");

// pull in the project Typescript config
const tsProject = tsGulp.createProject('tsconfig.json');

gulp.task('scripts', function () {
    const tsResult = tsProject.src()
        .pipe(tsProject());
    return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('watch', ['scripts'], function () {
    gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('default', ['watch']);


