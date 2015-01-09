var connect = require('gulp-connect'),
	cfg = require('./config');

connect.server({
	root: cfg.build.html,
	port: 8082,
	livereload: true
});

module.exports = connect;
