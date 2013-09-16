'use strict';

function runTask(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		name: '{%= name %}',
		srcPath: 'src',
		assetsPath: 'assets',
		distPath: '{%= publish_dir %}',

		copy: {
			package: {
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
			package: {
				files: ['package.json'],
				tasks: ['copy:package', 'depcombo:main']
			},


			js: {
				files: ['<%= srcPath %>/*.js', '<%= srcPath %>/**/*.js'],
				tasks: ['depconcat:main', 'uglify:main']
			},

			css:  {
				files: ['<%= assetsPath %>/*.less', '<%= assetsPath %>/**/*.less'],
				tasks: ['less:main', 'cssmin:main']
			}
		},

		depcombo: {
			main: {
				options: {
					useDebug: true,
					useDaily: false,
					output: 'url'
				},
				dest: '<%= distPath%>/combo.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-depconcat');
	grunt.loadNpmTasks('grunt-depcombo');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	

	grunt.registerTask('dist', ['copy', 'depconcat', 'uglify', 'less', 'cssmin', 'depcombo']);
	grunt.registerTask('dev', ['watch']);
	
	grunt.registerTask('default', ['dist']);

};

module.exports = function(grunt) {
	runTask(grunt);
}