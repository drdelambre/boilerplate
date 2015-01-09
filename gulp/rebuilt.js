var nn = require('node-notifier'),
	path = require('path'),
	icon = path.join(__dirname,'../favicon/apple-touch-icon-152x152.png');

module.exports = function(){
	nn.notify({
		title: 'Cinelli',
		message: 'frontend has been rebuilt',
		icon: icon,
		sound: false
	});

	console.log('completed build ***********************************');
};
