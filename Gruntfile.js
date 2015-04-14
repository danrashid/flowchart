module.exports = function(grunt) {

  var sources = {
    jade: 'assets/templates/**/*.jade',
    jshint: ['**/*.js', '!node_modules/**', '!public/js/vendor/**', '!public/js/templates.js'],
    sass: 'assets/scss/main.scss'
  };

  grunt.initConfig({
    jade: {
      dist: {
        options: {
          compileDebug: false,
          client: true,
          namespace: 'templates',
          processName: function (filename) {
            return filename.match(/^assets\/templates\/(.+)\.jade$/)[1];
          }
        },
        files: {
          'public/js/templates.js': sources.jade
        }
      }
    },
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
      jade: {
        files: sources.jade,
        tasks: ['jade']
      },
      sass: {
        files: sources.sass,
        tasks: ['sass']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jade', 'jshint', 'sass']);
};
