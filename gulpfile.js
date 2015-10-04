var gulp = require('gulp'),
  runSequence = require('run-sequence'),
  shell = require('gulp-shell');

// Call npm run build to use webpack to build bundle.js
gulp.task('runbuild', shell.task('npm run build'));

// Watch and rebuild
gulp.task('watch', function () {
  gulp.watch('index.html', function () {
    return runSequence('runbuild');
  });
  gulp.watch('src/**/*', function () {
    return runSequence('runbuild');
  });
});

// Defaul task: runbuild and then watch
gulp.task('default', function () {
  runSequence('runbuild', 'watch');
});