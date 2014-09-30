require.config({
	packages: [{
		name: 'dd',
		location: 'node_modules/dd/',
		main: 'dd'
	},{
		name: 'site',
		location: 'lib',
		main: 'null'
	}]
});

// Load your page js here
// Example: require(['site/pages/login']);