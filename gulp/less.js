var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	alertError = require('./error'),
	sourcemaps = require('gulp-sourcemaps'),
	recess = require('gulp-recess'),
	less = require('gulp-less'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	server = require('./server'),
	del = require('del'),
	cfg = require('./config');

gulp.task('clean:less', function(cb){
	try {
		del(cfg.build.css, function(err){
			if(err){
				console.log('Error in clean:less', err);
			}
			cb();
		});
	} catch(err){
		console.log('Error in clean:less', err);
	}
});
gulp.task('less:lint', function(){
	return gulp.src('less/**/*.less')
		.pipe(plumber({
			errorHandler: alertError
		}))
		.pipe(recess())
		.pipe(recess.reporter())
});
gulp.task('less:build', ['clean:less', 'less:lint'], function(){
	return gulp.src('less/styles.less')
		.pipe(plumber({
			errorHandler: alertError
		}))
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(autoprefixer({
			browsers: [
				'last 2 version',
				'safari 5',
				'ie 8',
				'ie 9',
				'opera 12.1',
				'ios 6',
				'android 4'
			]
		}))
		.pipe(minifycss())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(cfg.build.css))
		.pipe(server.reload());
});
gulp.task('less', ['less:build']);

gulp.watch(['less', 'less/**/*.less'], ['less']);
