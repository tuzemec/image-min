module.exports = function (grunt) {
  'use strict';

  // show elapsed time at the end
  require('time-grunt')(grunt);

  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // Init
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // clean all generated files
    clean: {
      all: {
        files: [{
          src: ['images-min/**/*.{png,jpg,gif,jpeg}']
        }]
      }
    },

    // Image Optimization
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3
        },
        files: [
          {
            expand: true,
            cwd: 'images',
            src: ['**/*.{png,jpg,gif,jpeg}'],
            dest: 'images-min'
          }
        ]
      }
    },

    // tiny png settings
    tinypng: {
    	options: {
        // add your own api key here
        apiKey: ""
      },
      files: {
        expand: true,
        cwd: 'images/',
        src: '*.png',
        dest: 'images-tiny/'
      }
    },

    watch: {
      image_min: {
        files: ['images/**/*.{png,jpg,gif,jpeg}'],
        tasks: ['imagemin']
      },
      tiny: {
        files: ['images/**/*.png'],
        tasks: ["tinypng"]
      }
    },
  });

  // Tasks

  grunt.registerTask('default', function() {
    grunt.task.run(['imagemin']);
    grunt.task.run(['watch']);
  });

  grunt.registerTask('all', function() {
    grunt.task.run(['imagemin', 'tinypng']);
  });

};
