var nn = require('node-notifier'),
	gutil = require('gulp-util'),
	path = require('path')
		.join(__dirname, './logo.png');

module.exports = function(err){
	nn.notify({
		title: 'Error Rebuilting',
		message: 'Check your console',
		sound: false,
		contentImage: path
	});

	gutil.log(gutil.colors.red(err));
};
