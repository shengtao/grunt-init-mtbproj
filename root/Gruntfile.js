'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		name: '{%= name %}',
		srcPath: 'src',
		assetsPath: 'assets',
		distPath: '{%= publish_dir %}',

		clean: ['<%= distPath%>/*'],

		copy: {
			main: {
				files: [{
					expand: true,
					cwd: './',
					src: ['package.json'],
					dest: '<%= distPath %>'
				}]
			}
		},

		depconcat: {
			options: {
				separator: '\n'
			},
		
			main: {
				src: ['<%= srcPath %>/main.js'],
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
					src: ['<%= name %>.less'],
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
			combo: {
				files: ['package.json'],
				tasks: ['copy', 'depcombo:debug']
			},


			js: {
				files: ['<%= srcPath %>/*.js', '<%= srcPath %>/**/*.js'],
				tasks: ['depconcat', 'uglify', 'depcombo:debug']
			},

			css:  {
				files: ['<%= assetsPath %>/*.less', '<%= assetsPath %>/**/*.less'],
				tasks: ['less', 'cssmin']
			}
		},

		depcombo: {
            debug: {
                options: {
                  useDebug: true,
                  useDaily: false,
                  output: 'url'
                },
                dest: '<%= distPath%>/combo.debug.js'
            },

            main: {
                options: {
                    output: 'file'
                },
                dest: '<%= distPath%>/combo.js'
            }
		}
	});

	grunt.loadNpmTasks('grunt-depconcat');
	grunt.loadNpmTasks('grunt-depcombo');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	

	grunt.registerTask('dist', ['copy', 'depconcat', 'uglify', 'less', 'cssmin', 'depcombo']);
	grunt.registerTask('dev', ['watch']);
	
	grunt.registerTask('default', ['dist']);
}