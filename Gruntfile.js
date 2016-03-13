module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      gruntfile: {
        files: ['Gruntfile.js']
      },
		 livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          'public/admin/pages/*.html'
        ]
      }
	
    },
	 connect: {
      options: {
        port: 8090,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true
        }
      },
      test: {
        options: {
          port: 8091
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  
  
  grunt.registerTask('default', ['watch']);

};