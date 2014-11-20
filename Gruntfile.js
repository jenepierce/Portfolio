module.exports = function(grunt) {

  // All configuration goes here
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      // Configuration for concatinating files goes here.
      dist: {
        src: [
          'js/googleanalytics.js',
          'bower_components/angular/angular.js', // All bower components
          'bower_components/picturefill/picturefill.js',
          'bower_components/angular-picturefill/angular-picturefill.js',
          'bower_components/angular-sanitize/angular-sanitize.min.js',
          'bower_components/matchmedia-ng/matchmedia-ng.js',
          'bower_components/matchmedia/matchmedia.js',
          'js/app.js',
          'js/hideaddressbar.js', // Normalize hide address bar for iOS and Android
          'js/respond.min.js', // Add media query support for IE8 and under. Must place media queries in external stylesheet
          'js/matchmedia.js' // Using matchmedia to provide support for IE8 and below + older browsers
          // 'js/*.js' // All JS
        ],
        dest: 'js/build/production.js',
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
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'css/style.css': 'css/style.scss'
        }
      }
    },
    watch: {
      // options: {
      //   livereload: true,
      // },
      scripts: {
        files: ['js/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false,
        },
      },
      css: {
        files: ['css/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false,
        }
      }
    }

  });

  // Where we tell Grunt we plan to use this plug-in.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Where we tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask('default', ['concat', 'uglify', 'imagemin', 'watch']);

};
