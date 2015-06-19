module.exports = function(grunt) {
  
  pathAssets = 'assets/';
  pathLibs = 'node_modules/';
  pathStylus = pathAssets + 'styl/';
  pathCss = pathAssets + 'css/';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    stylus: {
      compile: {
        files: {
          'assets/css/app.min.css': ['assets/styl/**/*.styl']
        }
      }
    },

  	concat_in_order: {
	    dist : {
	    	files : {
	    		'assets/js/app.min.js' : 'app/**/*.js'
	    	}
	    },
	    lib : {
  			files : {
  				'assets/js/lib.min.js' : [pathLibs + 'angular/angular.min.js', pathLibs + 'angular-route/angular-route.min.js']
  			}
	    }
  	},

    copy :{
      main: {
        files: [
          {
            expand: true,
            flatten: true,
            src: ['node_modules/angular-route/angular-route.min.js.map'], dest: 'assets/js/'
          }
        ],
      },
    },

    jshint: {
      all: ['Gruntfile.js','app/**.*.js','spec/**/*.js']
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },

    phantomcss: {
      options: {
        screenshots: 'screenshots',
        results: 'results',
        viewportSize: [1280, 800],
        mismatchTolerance: 0.05,
        rootUrl: 'http://localhost:9000/'
      },
      src: [
        'spec/visual/**/*.js'
      ]
    },

  	watch: {
  		styles: {
  			files: pathStylus + '**/*.styl',
  			tasks: ['stylus']
  		},
  		scripts: {
  			files: ['app/**/*.js'],
  			tasks: ['concat_in_order:dist', 'copy'],
  		}
  	},

    'http-server': {
      dev: {
        port: 9000,
        host: '127.0.0.1',
        showDir : true,
        autoIndex: true,
        ext: 'html',
        runInBackground: false
      }
    }

  });

  grunt.loadNpmTasks('grunt-bower-install-simple');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-concat-in-order');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-phantomcss');
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
