module.exports = function (grunt) {
    // Do grunt-related things in here
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        karma: {
            unit: {
                configFile: 'build/config/karma.conf.js',
                singleRun: true
            },
            punit: {
                configFile: 'build/config/karma.conf.js',
                singleRun: false
            },
            phantom: {
                configFile: 'build/config/karma-phantom.conf.js',
                singleRun: true
            }
        },
        clean: ["dist","angular-popper.js"],
        uglify: {
            options: {
                preserveComments: 'no'                
            },
            dist: {
                files: {                    
                    'dist/angular-popper.min.js': ['angular-popper.js']
                }
            }
        },
        concat: {
            options: {
              separator: ';'
            },
            dist: {
              src: ['src/*.js'],
              dest: 'angular-popper.js'
            }
          }
    });

    
    grunt.registerTask('test', ['karma:unit']);
    grunt.registerTask('travis', ['karma:phantom']);
    grunt.registerTask('default', ['dist', 'test']);
    grunt.registerTask('dist', [
        'clean',
        'concat',
        'uglify:dist'
        ]);
};
