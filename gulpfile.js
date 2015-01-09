var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	alertError = require('./gulp/error'),
	jscs = require('gulp-jscs'),
	jshint = require('gulp-jshint');

require('./gulp/javascript');
require('./gulp/less');
require('./gulp/markup');
require('./gulp/static');

gulp.task('gulp:style', function(){
	return gulp.src(['gulpfile.js', 'gulp/**/*.js'])
		.pipe(plumber({
			errorHandler: alertError
		}))
		.pipe(jscs({ configPath: 'lib/builder/jscs.json' }));
});

gulp.task('gulp:lint', function(){
	return gulp.src(['gulpfile.js', 'gulp/**/*.js'])
		.pipe(plumber({
			errorHandler: alertError
		}))
		.pipe(jshint('lib/builder/jshint.json'))
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));
});

gulp.task('gulp', ['gulp:style', 'gulp:lint']);

gulp.task('build', ['gulp', 'static', 'markup', 'less', 'js']);

gulp.task('default', ['build'], function(){
	gulp.watch([
		'gulpfile.js',
		'gulp/**/*.js',
		'lib/builder/*.*'
	], ['build']);
});
