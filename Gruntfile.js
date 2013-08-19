/*
 * grunt-underscore-compile
 * https://github.com/chris/grunt-underscore-compile
 *
 * Copyright (c) 2013 Chris Grant
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // Configuration to be run (and then tested).
    underscore_compile: {
      compile: {
        files: {
          'tmp/custom_options': ['test/fixtures/testing', 'test/fixtures/123'],
        }
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  grunt.registerTask('compile',['underscore_compile']);

};
