'use strict';

var
  gulp,
  sass,
  // sassLint,
  sassTasks,
  sourcemaps,
  autoprefixer,
  // livereload,
  gutil,
  definitions,
  watchPaths,
  path;

// Libraries.
gulp = require('gulp');
sass = require('gulp-sass');
// sassLint = require('gulp-sass-lint');
sourcemaps = require('gulp-sourcemaps');
autoprefixer = require('gulp-autoprefixer');
// livereload = require('gulp-livereload');
gutil = require('gulp-util');
path = require('path');

// Theme/module definitions.
definitions = [
  {
    key: 'transitionAngels',
    base: '',
    sass: 'scss',
    css: 'stylesheets'
  }
];

// Watch paths, will be auto-generated.
watchPaths = {
  // livereload: [],
  sass: [],
};

// Auto-generate watch paths and compass tasks.
definitions.forEach(function (definition) {
  var
    sassConf,
    sassPath,
    cssPath;

  sassPath = path.join(definition.base, definition.sass, '**/*.scss');

  // Add livereload watch paths.
  cssPath = path.join(definition.base, definition.css, '/**/*.css');
  // watchPaths.livereload.push(cssPath);

  // Create SASS task.
  sassConf = {}
  if (definition.includePaths) {
    sassConf.includePaths = definition.includePaths;
  }

  // SASS compilation.
  gulp.task('sass:' + definition.key, function () {
    gulp.src(sassPath)
      // .pipe(sassLint())
      // .pipe(sassLint.format())
      .pipe(sourcemaps.init())
      .pipe(sass(sassConf).on('error', function (err) {
        // Trigger terminal bell.
        gutil.beep();
        gutil.log(gutil.colors.red(err.message));
      }))
      //.pipe(autoprefixer({
      //  browsers: ['last 2 versions'],
      //  cascade: false
      //}))
      .pipe(sourcemaps.write('/'))
      .pipe(gulp.dest(path.join(definition.base, definition.css)));
  });
  watchPaths.sass.push({
    task: 'sass:' + definition.key,
    watchPath: sassPath
  });

  // Add separate tasks SASS linting as well.
  gulp.task('sasslint:' + definition.key, function () {
    gulp.src(sassPath);
      // .pipe(sassLint())
      // .pipe(sassLint.format())
      // .pipe(sassLint.failOnError());
  });
  // watchPaths.sassLint.push({
  //   task: 'sasslint:' + definition.key,
  //   watchPath: sassPath
  // });
});



// Task to watch files for livereload.
// gulp.task('watch', function () {

//   gulp.watch(watchPaths.livereload).on('change', livereload.changed);

// });

sassTasks = watchPaths.sass.map(function (item) {
  return item.task;
});

gulp.task('default', sassTasks, function () {

  // livereload.listen();

  // Watch for SASS.
  watchPaths.sass.forEach(function (sassDef) {
    gulp.watch(sassDef.watchPath, [sassDef.task]);
  });

  // Watch for livereload.
  // gulp.watch(watchPaths.livereload).on('change', livereload.changed);

});
