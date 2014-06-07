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
      dev: {
        files: browserifyFiles,
        bundleOptions: {
          debug: true
        },
        options:{
          watch:true,
          alias: [ './src/main/resources/js/app.js:' ]
        }
      },
      test:{
        src: [ 'src/main/resources/js/suite.js' ],
        dest: './target/browserified_tests.js',
        bundleOptions: {
          debug: true
        },
        options: {
          watch:true,
          external: [ './src/main/resources/js/app.js' ]
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
      js: {
        files: ['Gruntfile.js','src/main/resources/js/**/*.js'],
        tasks: ['js']
      },
      test: {
        files: ['Gruntfile.js','src/test/resources/**','src/main/resources/js/**/*.js'],
        tasks: ['test']
      },
      css:{
        files: ['src/main/resources/less/**/*.less'],
        tasks:['less:dev']
      }
     },
    jshint: {
      files: ['Gruntfile.js','src/main/resources/js/**/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    copy: {
      test: {
        files: [
          // includes files within path
          {expand: true, flatten:true, src: ['src/test/resources/*'], dest: 'target/', filter: 'isFile'},

          // includes files within path and its sub-directories
          {expand: true, flatten:true, src: ['src/main/resources/static/js/bundle.js'], dest: 'target/'},
        ]
      }
    },
    clean: {
      test: ["target"]
    },
    connect: {
      // Used for mocha-phantomjs tests
      server: {
        options: {
          base: 'target'
        }
      },

      // you can use this manually by doing
      // grunt connect:keepalive
      // to start a server for the example pages (browser/example/*.html) or to
      // run the tests manually in a browser
      keepalive: {
        options: {
          keepalive: true
        }
      }
    },
    // run the mocha tests in the browser via PhantomJS
    'mocha_phantomjs': {
      test: {
        options: {
          urls: [
            'http://127.0.0.1:8000/test.html'
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-mocha-phantomjs');

  grunt.registerTask('release', ['jshint','browserify:release','less:release']);

  /**
   * For manual browser test
   */
  grunt.registerTask('js', [
    'jshint',
    'browserify:dev'
  ]);

  // Setup idea from https://blog.codecentric.de/en/2014/02/cross-platform-javascript/
  grunt.registerTask('test', [
    'clean:test',
    'jshint',
    'browserify:dev',
    'browserify:test',
    'copy:test',
    'connect:server',
    'mocha_phantomjs'
  ]);

};