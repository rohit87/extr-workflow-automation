module.exports = function(grunt) {

	//var jsLibs = require('wiredep')().js;

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      app: {
        src: ['app/scripts/**/**.js'],
        dest: 'dist/<%= pkg.name %>.js',
      },
      lib:  {
        src: require('wiredep')().js,
        dest: 'dist/<%= pkg.name %>-lib.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      app: {
        src: '<%= concat.app.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      },
      lib: {
        src: '<%= concat.lib.dest %>',
        dest: 'dist/<%= pkg.name %>-lib.min.js'
      }
    },

    cssmin: {
      main: {
        files: {
          "dist/main.min.css": [
            "app/styles/main.css"
          ]
        }
      },
    },

    jshint: {
      options: {
        "node": true,
        "browser": true,
        "esnext": true,
        "bitwise": true,
        "camelcase": true,
        "curly": true,
        "eqeqeq": true,
        "immed": true,
        "indent": 2,
        "latedef": true,
        "newcap": true,
        "noarg": true,
        "quotmark": "single",
        "regexp": true,
        "undef": true,
        "unused": true,
        "strict": true,
        "trailing": true,
        "smarttabs": true,
        "globals": {
          "angular": false
        }
      },
      app: {
        src: '<%= concat.app.src %>'
      }
    },

    injector: {
      options: {
        addRootSlash: false,
      },
      js: {
        options: {

        },
        files: {
          'index.html': '<%= concat.app.src %>',
        }
      },

      scss: {
        options: {
          starttag: '// injector:scss',
          endtag: '// endinjector',
          ignorePath: "app/styles/",
          transform: function(filepath){
            if(grunt.file.isMatch({ matchBase: true }, '*.scss', filepath)){
              return '@import "' + filepath + '";';
            }
            else
              return "// No format Specified";
          }
        },
        files: {
          'app/styles/main.scss': ['app/styles/*/**.scss'],
        }
      }
    },

    watch: {
      js: {
        files: '<%= concat.app.src %>',
        tasks: ['injector:js', 'buildjs']
      },

      scss: {
        files: ['app/styles/*/**.scss'],
        tasks: ['injector:scss', 'buildcss'],
      },

      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
    },

    wiredep: {
      libs: {
        src: [
          'index.html',
          'app/styles/main.scss'
        ]
      }
    },

    sass:{
      main: {
        options: {
          style: 'expanded'
        },
        files: {
          'app/styles/main.css': 'app/styles/main.scss'
        }
      }
    },

  });

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-asset-injector');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task.
  grunt.registerTask('default', ['jshint', 'wiredep', 'injector', 'cssmin', 'concat', 'uglify']);
  grunt.registerTask('buildjs', ['concat', 'uglify']);
  grunt.registerTask('buildcss', ['sass', 'cssmin']);
  grunt.registerTask('dev', ['watch']);

};