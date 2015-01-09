var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	alertError = require('./error'),
	inc = require('gulp-file-include'),
	rename = require('gulp-rename'),
	alertError = require('./error'),
	server = require('./server'),
	del = require('del'),
	cfg = require('./config');

gulp.task('clean:markup', function(cb){
	try {
		del(cfg.build.html + '/index.html', cb);
	} catch(err){
		console.log('Error in clean:markup', err);
	}
});

gulp.task('markup', ['clean:markup'], function(){
	return gulp.src(['views/main.view'])
		.pipe(plumber({
			errorHandler: alertError
		}))
		.pipe(inc({
			prefix: '@@',
			basepath: './views',
			variables: {
				title: 'beans mcgee',
				description: 'neateo, Im a webpage!'
			}
		}))
		.pipe(rename({
			dirname: '',
			basename: 'index',
			extname: '.html'
		}))
		.pipe(gulp.dest(cfg.build.html))
		.pipe(server.reload());
});

gulp.watch(['views', 'views/**/*.view'], ['markup']);
