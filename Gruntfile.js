/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
    browserify: {
      bundleOptions: {
        debug: true
      },
      js: {
        src:['src/main/resources/js/app.js'],
        dest: 'src/main/resources/static/js/<%= pkg.name %>.js'
      }
    },
    less: {
      development: {
        files: {
          "src/main/resources/static/css/<%= pkg.name %>.css": "src/main/resources/less/build.less"
        }
      },
      production: {
        options: {
          cleancss: true
        },
        files: {
          "src/main/resources/static/css/<%= pkg.name %>.min.css": "src/main/resources/less/build.less"
        }
      }
    },
    watch: {
      scripts: {
        files: ['src/main/resources/js/**/*.js'],
        tasks: ['browserify:js']
      },
      css:{
        files: ['src/main/resources/less/**/*.less'],
        tasks:['css']
      }
     }
  }),

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('css', ['less:development','less:production']);
  grunt.registerTask('js', ['browserify:js']);
  grunt.registerTask('default', ['js','css']);

}