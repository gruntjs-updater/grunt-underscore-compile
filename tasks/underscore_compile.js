/*
 * grunt-underscore-compile
 * https://github.com/chris/grunt-underscore-compile
 *
 * Copyright (c) 2013 Chris Grant
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('underscore_compile', 'Compile underscore templates into an AMD module', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ''
    }),
    lineBreak = new RegExp(grunt.util.linefeed,'g');

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        var filename = '';

        if( filepath.indexOf('/') > 0 ) {
          var path = filepath.split('/');
          filename = path[path.length-1];
        } else {
          filename = filepath;
        }
        
        if (filename.indexOf('.html') > -1) {

          return 'JST[\''+filename+'\']="'+ grunt.file.read(filepath).replace(lineBreak,'').replace(/"/g,'\"') + '";';

        }

      }).join(grunt.util.normalizelf(options.separator));

      // Handle options.

      src = 'define(function(){ var JST={};'+src+'});return JST;});';

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
