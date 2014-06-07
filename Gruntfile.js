'use strict';

module.exports = function(grunt) {

   // Idea from http://blog.safaribooksonline.com/2013/12/16/the-power-of-grunt-2/
  var browserifyFiles = { 'src/main/resources/static/js/bundle.js':
      [ 'src/main/resources/js/app.js' ]
  };

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    browserify: {
      options: {
        watch:true
      },
      dev: {
        files: browserifyFiles,
        bundleOptions: {
          debug: true
        }
      },
      release: {
        files: browserifyFiles,
        options: { debug: false }
      }
    },
    less: {
      dev: {
        files: {
          "src/main/resources/static/css/<%= pkg.name %>.css": "src/main/resources/less/build.less"
        }
      },
      release: {
        options: {
          cleancss: true
        },
        files: {
          "src/main/resources/static/css/<%= pkg.name %>.min.css": "src/main/resources/less/build.less"
        }
      }
    },
    watch: {
      validate: {
        files: ['Gruntfile.js','src/main/resources/js/**/*.js'],
        tasks: ['jshint']
      },
      css:{
        files: ['src/main/resources/less/**/*.less'],
        tasks:['less:dev']
      }
     },
    jshint: {
      files: ['Gruntfile.js','src/main/resources/js/**/*.js'],
      options: {
        devel: true,
        globalstrict: true,
        node: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task.
  grunt.registerTask('validate', ['jshint', 'mocha:dev']);
  grunt.registerTask('release', ['jshint','browserify:release','less:release']);
  grunt.registerTask('dev', ['validate', 'less:dev', 'browserify:dev']);
  grunt.registerTask('dev-no-validate', ['less:dev', 'browserify:dev']);

};