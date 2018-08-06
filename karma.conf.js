const fs = require('fs'),
  project = require('./project.json');

function getFiles(){
  return project.scripts.vendor.files
    .concat(project.scripts.test.vendor.files)
    .concat([
      `${project.environments.dist.root}/${project.environments.dist.filename}`,
      project.templates.source.files,
      project.scripts.source.files[0]
    ]);
}

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: getFiles(),
    exclude: [],
    preprocessors: {
      [project.scripts.test.coverage]: ['coverage'],
      [project.templates.source.files]: ['ng-html2js']
    },
    reporters: ['coverage', 'mocha'],
    ngHtml2JsPreprocessor: {
      stripPrefix: 'src/scripts',
      moduleName: project.templates.source.module.name
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['jsdom'],
    singleRun: true,
    concurrency: Infinity,
    coverageReporter: {
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' }
      ],
      check: {
        global: {
          statements: 100,
          branches: 100,
          functions: 100,
          lines: 100
        }
      }
    }
  });
};
