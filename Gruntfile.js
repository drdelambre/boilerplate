module.exports = function (grunt) {
	// Displays the elapsed execution time of grunt tasks
	require('time-grunt')(grunt);
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-include-replace');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-ssh');

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		secret: grunt.file.readJSON('secret.json'),

		watch: {
			grunt: {
				files: ['Gruntfile.js'],
				tasks: ['clean','sass:dev','jshint','requirejs:dev','includereplace:dev']
			},
			sass: {
				files: ['css/src/**/*.{scss,sass}'],
				tasks: ['clean:css','sass:dev']
			},
			js: {
				files: ['js/config.js','js/lib/**/*.js','js/src/**/*.js'],
				tasks: ['clean:js','jshint','requirejs:dev']
			},
			views: {
				files: ['views/**/*.view'],
				tasks: ['clean:markup','includereplace:dev']
			}
		},

		clean: {
			markup: ['index.html'],
			css: ['css/styles.css*','css/fold-line.css*'],
			js: ['js/script.js*']
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
			options: {
				imagePath: '/images/',
				sourceMap: true
			},
			prod: {
				options: { outputStyle: 'compressed' },
				files: {
					'css/styles.css': 'css/src/styles.scss',
					'css/fold-line.css': 'css/src/fold-line.scss'
				}
			},
			dev: {
				files: {
					'css/styles.css': 'css/src/styles.scss',
					'css/fold-line.css': 'css/src/fold-line.scss'
				}
			}
		},

		requirejs: {
			prod: {
				options: {
					baseUrl: '.',
					mainConfigFile: 'js/config.js',
					include: ['js/config'],
					name: 'js/almond.js',
					out: 'js/script.js',
					optimize : 'uglify2',
					preserveLicenseComments: false,
					generateSourceMaps : false,

					uglify2: {
						warnings: true,
						mangle: false
					}
				}
			},
			dev: {
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
		},

		includereplace: {
			prod: {
				options: {
					globals: {
						title: 'unconfigured website',
						description: 'please configure your website'
					}
				},
				src: 'views/main.view',
				dest: 'index.html'
			},
			dev: {
				options: {
					globals: {
						title: 'unconfigured website',
						description: 'please configure your website'
					}
				},
				src: 'views/main.view',
				dest: 'index.html'
			}
		},

		sftp: {
			options: {
				path: '<%= secret.root %>',
				host: '<%= secret.host %>',
				username: '<%= secret.username %>',
				password: '<%= secret.password %>',
				showProgress: false,
				createDirectories: true
			},
			core: {
				files: { './': ['index.html','css/styles.css*','js/script.js*'] }
			},
			assets: {
				files: { './': ['images/*','favicon/*','fonts/*'] }
			}
		}
	});

	// Default Task
	grunt.registerTask('default', ['watch']);

	// Release Tasks
	grunt.registerTask('build', [
		'clean',
		'sass:dev',
		'jshint',
		'requirejs:dev',
		'includereplace:dev'
	]);
	grunt.registerTask('deploy', [
		'clean',
		'sass:prod',
		'jshint',
		'requirejs:prod',
		'includereplace:prod',
		'sftp:core'
	]);
	grunt.registerTask('refresh', [
		'clean',
		'sass:prod',
		'jshint',
		'requirejs:prod',
		'includereplace:prod',
		'sftp:core',
		'sftp:assets'
	]);
};