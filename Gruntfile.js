module.exports = function(grunt) {

  // All configuration goes here
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      // Configuration for concatinating files goes here.
      dist: {
        src: ['js/*.js'],
        dest: 'js/build/production.js',
      }
    },
    bower_concat: {
		  all: {
		    dest: 'js/_bower.js',
		    dependencies: {
		      'angular-picturefill': 'angular',
		      'angular-sanitize': 'angular'
		    },
		    bowerOptions: {
		      relative: false
		    }
		  }
		},
    uglify: {
      build: {
        src: 'js/build/production.js',
        dest: 'js/build/production.min.js'
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'img/build/'
        }]
      }
    },
    compass: {
      dist: {
        options: {
          sassDir: 'sass',
          cssDir: 'css'
        }
      }
    },
    // coffee: {
    //   compile: {
    //     files: {
    //       'path/to/result.js': 'path/to/source.coffee', // 1:1 compile
    //       'path/to/another.js': ['path/to/sources/*.coffee', 'path/to/more/*.coffee'] // compile and concat into single file
    //     }
    //   }
    // },
    watch: {
      // options: {
      //   livereload: true,
      // },
      // coffee: {
      //   files: ['js/*.js'],
      //   tasks: ['coffee'], // concat, uglify?
      //   options: {
      //     spawn: false
      //   }
      // },
      scripts: {
        files: ['js/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false
        }
      },
      css: {
        files: '**/*.scss',
        tasks: ['compass'],
        options: {
          spawn: false,
        }
      },
      html: {
        files: ['index.html', 'templates/*.html'],
        options: {
          spawn: false
        }
      }
    }

  });

  // Where we tell Grunt we plan to use this plug-in.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-bower-concat');
  // grunt.loadNpmTasks('grunt-contrib-coffee');

  // Where we tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask('build', ['bower_concat', 'concat', 'compass', 'uglify']);
  grunt.registerTask('default', ['bower_concat', 'concat', 'uglify', 'watch']);
  grunt.registerTask('imagemin', ['imagemin']);

};
