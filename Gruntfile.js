module.exports = function(grunt) {
  var mozjpeg = require('imagemin-mozjpeg');

  grunt.initConfig({
    imagemin: {
      dynamic: {
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'assets/minified/images', // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'assets/minified/images' // Destination path prefix
        }]
      }
    },
    uglify: {
    my_target: {
      files: {
        'assets/minified/js/scripts.min.js': 'assets/js/**/*.js'
      }
    }
  }
  });
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['imagemin', 'uglify']);
}
