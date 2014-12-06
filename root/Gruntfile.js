'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		name: '{%= name %}',
        srcPath: 'js',
		assetsPath: 'assets',
		distPath: 'build',
        rootPath: '../../../',
        publishPath: '../../../assets/',

		clean: ['<%= distPath%>/*'],

		depconcat: {
			options: {
				separator: '\n'
			},
		
			main: {
				src: ['<%= srcPath %>/<%= name %>.js'],
				dest: '<%= distPath %>/<%= name %>.debug.js'
			}
		},

		uglify: {
			main: {
				files: [{
					expand: true,
					cwd: '<%= distPath %>',
					src: ['*.debug.js'],
					dest: '<%= distPath %>',
					ext: '.js'
				}]
			}
		},

		less: {
			options: {
				paths: ['<%= assetPath %>']
			},

			main: {
				files: [{
					expand: true,
					cwd: '<%= assetsPath %>',
                    src: ['*.less', '!common.less', '!_*.less'],
					dest: '<%= distPath %>',
					ext: '.debug.css'
				}]
			}
		},

		cssmin: {
			options: {
				report: 'min'
			},

			main: {
				files: [{
					expand: true,
					cwd: '<%= distPath %>',
					src: ['*.debug.css'],
					dest: '<%= distPath %>',
					ext: '.css'
				}]
			}
		},

		watch: {
			js: {
				files: ['<%= srcPath %>/*.js', '<%= srcPath %>/**/*.js'],
				tasks: ['depconcat', 'uglify']
			},

			css:  {
				files: ['<%= assetsPath %>/*.less', '<%= assetsPath %>/**/*.less'],
				tasks: ['less', 'cssmin']
			}
		},

        copy: {
            img: {
                expand: true,
                cwd: '<%= assetsPath %>',
                src: 'img/*',
                dest: '<%= distPath %>/'
            },
            assets: {
                expand: true,
                cwd: '<%= distPath %>/',
                src: '**',
                dest: '<%= publishPath + name %>/'
            },
            data:{
                src: 'data/*',
                dest: '<%= rootPath + name %>/'
            },
            html: {
                expand: true,
                cwd: './',
                src: '*.html',
                dest: '<%= rootPath + name %>/',
                options: {
                    process: function (content, srcpath) {
                        return content.replace(/build\//g, '../assets/{%= name %}/').replace(/debug\./g, '');
                    },
                }
            }
        },
	});

	grunt.loadNpmTasks('grunt-depconcat');
//	grunt.loadNpmTasks('grunt-depcombo');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	

	grunt.registerTask('dist', ['copy:img', 'depconcat', 'uglify', 'less', 'cssmin']);
	grunt.registerTask('dev', ['watch']);
	
	grunt.registerTask('default', ['dist']);
    grunt.registerTask('publish', ['copy:assets', 'copy:data', 'copy:html']);
}