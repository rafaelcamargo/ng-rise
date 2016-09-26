module.exports = function(grunt) {

  var pathLibs = 'node_modules/';
  var pathApp = 'app/';
  var pathSpec = 'spec/';
  var pathAssets = 'assets/';
  var pathStyles = pathAssets + 'styl/';

  var libFiles = pathLibs + '**/*.min.js';
  var styleFiles = pathStyles + '**/*.styl';
  var appFiles = pathApp + '**/*.js';
  var specFiles = pathSpec + '**/*.js';
  var configFiles = [
    'package.json',
    'karma.conf.js',
    'Gruntfile.js'
  ];

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    stylus: {
      compile: {
        files: {
          'assets/css/app.min.css': styleFiles
        }
      }
    },

    concat_in_order: {
      dist : {
        files : {
          'assets/js/app.min.js' : appFiles
        }
      },
      lib : {
        files : {
          'assets/js/lib.min.js' : [
            pathLibs + 'angular/angular.min.js',
            pathLibs + 'angular-route/angular-route.min.js'
          ]
        }
      }
    },

    copy :{
      main: {
        files: [
          {
            expand: true,
            flatten: true,
            src: 'node_modules/angular-route/angular-route.min.js.map',
            dest: 'assets/js/'
          }
        ]
      }
    },

    jshint: {
      dist: appFiles,
      spec: specFiles,
      conf: configFiles
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },

    watch: {
      styles: {
        files: styleFiles,
        tasks: ['stylus']
      },
      dist: {
        files: appFiles,
        tasks: [
          'jshint:dist',
          'concat_in_order:dist'
        ]
      },
      lib: {
        files: libFiles,
        tasks: ['concat_in_order:lib']
      },
      spec: {
        files: specFiles,
        tasks: ['jshint:spec']
      },
      conf: {
        files: configFiles,
        tasks: ['jshint:conf']
      }
    },

    'http-server': {
      dev: {
        port: 9000,
        host: '0.0.0.0',
        showDir : true,
        autoIndex: true,
        ext: 'html',
        runInBackground: true
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-concat-in-order');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-http-server');

  grunt.registerTask('build', [
    'stylus',
    'concat_in_order',
    'copy',
    'jshint',
    'karma'
  ]);

  grunt.registerTask('start', [
    'http-server',
    'watch'
  ]);

};
