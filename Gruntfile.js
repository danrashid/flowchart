module.exports = function(grunt) {

  var sources = {
    jshint: ['**/*.js', '!node_modules/**', '!public/js/vendor/**', '!public/js/templates.js'],
    sass: 'assets/scss/main.scss'
  };

  grunt.initConfig({
    jshint: {
      src: sources.jshint
    },
    sass: {
      dist: {
        options: {
          sourcemap: 'none'
        },
        files: {
          'public/main.css': sources.sass
        }
      }
    },
    watch: {
      sass: {
        files: sources.sass,
        tasks: ['sass']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'sass']);
};
