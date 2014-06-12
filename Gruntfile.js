module.exports = function (grunt) {
	// Displays the elapsed execution time of grunt tasks
	require('time-grunt')(grunt);
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-sass');

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch : {
			sass: {
				files: ['css/src/**/*.{scss,sass}'],
				tasks: ['sass:dev']
			},
			js: {
				files: ['Gruntfile.js','js/config.js','js/lib/**/*.js','js/src/**/*.js'],
				tasks: ['jshint','requirejs']
			}
		},

		jshint: {
			files: ['Gruntfile.js','js/config.js','js/src/**/*.js'],
			options: {
				curly: true,
				eqeqeq: true,
				forin: false,
				freeze: true,
				immed: true,
				indent: 4,
				latedef: true,
				noarg: true,
				nonbsp: true,
				plusplus: false,
				undef: true,
				unused: true,
				trailing: true,
				maxparams: 4,
				eqnull: true,
				browser: true,
				devel: false,
				phantom: true,
				sub: true,

				globals: {
					// AMD
					module:     true,
					require:    true,
					define:     true,

					// Environments
					console:    true
				}
			}
		},

		sass: {
			prod: {
				options: {
					imagePath: '/images/',
					outputStyle: 'compressed'
				},
				files: {
					'css/styles.css': 'css/src/styles.scss'
				}
			},
			dev: {
				options: {
					imagePath: '/images/',
					sourceMap: true
				},
				files: {
					'css/styles.css': 'css/src/styles.scss'
				}
			}
		},

		requirejs: {
			compile: {
				options: {
					baseUrl: '.',
					mainConfigFile: 'js/config.js',
					include: ['js/config'],
					name: 'js/almond.js',
					out: 'js/script.js',
					optimize : 'uglify2',
					preserveLicenseComments: false,
					generateSourceMaps : true,

					uglify2: {
						warnings: true,
						mangle: false
					}
				}
			}
		}
	});

	// Default Task
	grunt.registerTask('default', ['watch']);

	// Release Task
	grunt.registerTask('build', ['sass:dev','jshint','requirejs']);
	grunt.registerTask('deploy', ['sass:prod','jshint','requirejs']);
};