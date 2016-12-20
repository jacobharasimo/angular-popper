module.exports = function (grunt) {
    var serveStatic = require('serve-static');
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);
    // Do grunt-related things in here
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        clean: [
            "dist",
            "angular-popper.js"
        ],
        uglify: {
            options: {
                preserveComments: 'no'
            },
            dist: {
                files: {
                    'dist/angular-popper.min.js': ['dist/angular-popper.js']
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/*.js'],
                dest: 'dist/angular-popper.js'
            }
        },
        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost'
            },
            server: {
                options: {
                    open: true,
                    keepalive: true,
                    base: './example',
                    middleware: function (connect) {
                        return [
                            connect().use('/dist', serveStatic('./dist')),
                            connect().use('/node_modules', serveStatic('./node_modules')),
                            serveStatic('./example')
                        ]
                    }
                }
            }
        }
    });


    grunt.registerTask('serve',
        [
            'dist',
            'connect'
        ]
    );
    grunt.registerTask('test',
        [
            'karma:unit'
        ]
    );
    grunt.registerTask('default',
        [
            'dist',
            'test'
        ]
    );
    grunt.registerTask('dist',
        [
            'clean',
            'concat',
            'uglify:dist'
        ]
    );
};
