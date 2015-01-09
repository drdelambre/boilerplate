var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	alertError = require('./error'),
	jscs = require('gulp-jscs'),
	rename = require('gulp-rename'),
	jshint = require('gulp-jshint'),
	transform = require('vinyl-transform'),
	browserify = require('browserify'),
	server = require('./server'),
//	uglify = require('gulp-uglify'),
//	sourcemaps = require('gulp-sourcemaps'),
	del = require('del'),
	cfg = require('./config');

gulp.task('clean:js', function(cb){
	try {
		del([cfg.build.javascript + '/**/*.js*'], cb);
	} catch(err){
		alertError(err);
	}
});

gulp.task('js:style', function(){
	return gulp.src(['lib/**/*.js', '!lib/builder/**/*.js'])
		.pipe(plumber({
			errorHandler: alertError
		}))
		.pipe(jscs({ configPath: 'lib/builder/jscs.json' }));
});

gulp.task('js:lint', function(){
	return gulp.src(['lib/**/*.js', '!lib/builder/**/*.js'])
		.pipe(plumber({
			errorHandler: alertError
		}))
		.pipe(jshint('lib/builder/jshint.json'))
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));
});

gulp.task('js:build', ['clean:js'], function(){
	var browserified = transform(function(filename){
		var b = browserify(filename);
		return b.bundle();
	});

	return gulp.src(['lib/builder/config.js'])
		.pipe(browserified)
		.on('error', function(err){
			alertError(err);
			this.end();
		})
		.pipe(rename({
			dirname: '',
			basename: 'script',
			extname: '.js'
		}))
//		.pipe(sourcemaps.init())
//		.pipe(uglify())
//		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(cfg.build.javascript))
		.pipe(server.reload());
});

gulp.task('js', ['clean:js', 'js:style', 'js:lint', 'js:build']);

gulp.watch(['lib', 'lib/**/*.js'], ['js']);
