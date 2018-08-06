const fs = require('fs'),
  { argv } = require('yargs'),
  { exec } = require('child_process'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  concat = require('gulp-concat'),
  replace = require('gulp-replace'),
  gulpif = require('gulp-if'),
  minify = require('gulp-babel-minify'),
  stylus = require('gulp-stylus'),
  cleanCSS = require('gulp-clean-css'),
  sourcemaps = require('gulp-sourcemaps'),
  webserver = require('gulp-webserver'),
  templateCache = require('gulp-angular-templatecache'),
  htmlmin = require('gulp-htmlmin'),
  rename = require('gulp-rename'),
  writefile = require('writefile'),
  Server = require('karma').Server,
  project = require('./project.json'),
  ENV_DEV = require('./environments/dev.json'),
  ENV_PROD = require('./environments/prod.json'),
  ENV = argv.env == 'prod' ? ENV_PROD : ENV_DEV,
  fingerprint = new Date().getTime();

function revise(){
  return replace(/@@fingerprint/g, fingerprint);
}

gulp.task('js:env', () => {
  const fileContent = `window.ENV = ${JSON.stringify(ENV)}`;
  return writefile(
    `${project.environments.dist.root}/${project.environments.dist.filename}`,
    fileContent
  );
});

gulp.task('js:lib', () => {
  return gulp.src(project.scripts.vendor.files)
    .pipe(concat(project.scripts.dist.vendor.filename))
    .pipe(gulp.dest(project.scripts.dist.root));
});

gulp.task('js:app', () => {
  return gulp.src(project.scripts.source.files)
    .pipe(gulpif(ENV.SOURCE_MAPS, sourcemaps.init()))
    .pipe(concat(project.scripts.dist.filename))
    .pipe(gulpif(ENV.MINIFY, minify({mangle: false}).on('error', gutil.log)))
    .pipe(gulpif(ENV.SOURCE_MAPS, sourcemaps.write()))
    .pipe(gulp.dest(project.scripts.dist.root));
});

gulp.task('js:test', function(done) {
  exec('./node_modules/karma/bin/karma start', (err, stdout, stderr) => {
    if(err)
      console.log(err);
    console.log(stdout);
    done();
  });
});

gulp.task('css:lib', function(){
  return gulp.src(project.styles.vendor.files)
    .pipe(concat(project.styles.dist.vendor.filename))
    .pipe(cleanCSS({
      compatibility: 'ie8',
      keepSpecialComments: 0
    }))
    .pipe(gulp.dest(project.styles.dist.root))
});

gulp.task('css:app', function(){
  return gulp.src(project.styles.source.files)
    .pipe(stylus())
    .pipe(concat(project.styles.dist.filename))
    .pipe(cleanCSS({
      compatibility: 'ie8',
      keepSpecialComments: 0
    }))
    .pipe(gulp.dest(project.styles.dist.root))
});

gulp.task('html:templates', function () {
  return gulp.src(project.templates.source.files)
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(templateCache(project.templates.dist.filename, {
      standalone: true,
      root: '/',
      transformUrl: function(url){
        return url.replace('/scripts', '');
      }
    }))
    .pipe(minify({mangle: false}))
    .pipe(gulp.dest(project.templates.dist.root));
});

gulp.task('images', () => {
  return gulp.src(project.images.source.files)
    .pipe(gulp.dest(project.images.dist.root));
});

gulp.task('fonts', () => {
  return gulp.src(project.fonts.vendor.files)
    .pipe(gulp.dest(project.fonts.dist.root));
});

gulp.task('index', () => {
  return gulp.src(project.index.source.file)
    .pipe(gulpif(ENV.REVISE, revise()))
    .pipe(gulpif(ENV.MINIFY, htmlmin({
      collapseWhitespace: true,
      removeComments: true
    })))
    .pipe(gulp.dest(project.index.dist.root));
});

gulp.task('revise:index', () => {
  return gulp.src(project.index.dist.file)
    .pipe(gulpif(ENV.REVISE, revise()))
    .pipe(gulp.dest(project.index.dist.root));
});

gulp.task('revise:css', () => {
  return gulp.src(project.styles.dist.file)
    .pipe(gulpif(ENV.REVISE, revise()))
    .pipe(gulp.dest(project.styles.dist.root));
});

gulp.task('serve', function(){
  return gulp.src(project.index.dist.root)
    .pipe(webserver({
      livereload: true,
      port: 4000,
      host: '0.0.0.0'
    }));
});

gulp.task('watch', () => {
  gulp.watch(project.scripts.source.files, gulp.parallel('js:app'));
  gulp.watch(project.styles.source.files, gulp.parallel('css:app'));
  gulp.watch(project.templates.source.files, gulp.parallel('html:templates'));
  gulp.watch(project.images.source.files, gulp.parallel('images'));
  gulp.watch(project.index.source.file, gulp.parallel('index'));
});

gulp.task('build:base',
  gulp.parallel(
    'js:env',
    'js:lib',
    'js:app',
    'css:lib',
    'css:app',
    'html:templates',
    'fonts',
    'images',
    'index'
  )
);

gulp.task('build:revise',
  gulp.parallel(
    'revise:index',
    'revise:css'
  )
);

gulp.task('build',
  gulp.series(
    'build:base',
    'build:revise'
  )
);

gulp.task('start',
  gulp.series(
    'build:base',
    'serve',
    'watch'
  )
);

gulp.task('test',
  gulp.series(
    'js:env',
    'js:test'
  )
);
