var gulp = require('gulp'),
	del = require('del'),
	server = require('./server'),
	alertError = require('./error'),
	cfg = require('./config');

gulp.task('clean:favicon', function(cb){
	try {
		del(cfg.build.favicon, cb);
	} catch(err){
		alertError(err);
	}
});

gulp.task('clean:images', function(cb){
	try {
		del(cfg.build.images, cb);
	} catch(err){
		alertError(err);
	}
});

gulp.task('static:favicon', ['clean:favicon'], function(){
	gulp.src(['favicon/**/*'], { base: 'favicon' })
		.pipe(gulp.dest(cfg.build.favicon))
		.pipe(server.reload());
});

gulp.task('static:images', ['clean:images'], function(){
	gulp.src(['images/**/*'], { base: 'images' })
		.pipe(gulp.dest(cfg.build.images))
		.pipe(server.reload());
});

gulp.watch(['favicon', 'favicon/**/*'], ['static:favicon']);
gulp.watch(['images', 'images/**/*'], ['static:images']);

gulp.task('static', ['static:favicon', 'static:images']);
