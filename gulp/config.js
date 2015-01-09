var fs = require('fs'),
	path = require('path'),
	cfg = JSON.parse(fs.readFileSync("./package.json")),
	def, ni;

function default_object(root){
	return {
		html: root,
		images: root + "/images",
		favicon: root + "/favicon",
		javascript: root + "/js",
		css: root + "/css"
	};
}

if(!cfg.hasOwnProperty('build')){
	cfg.build = "./build";
}

if(typeof cfg.build === 'string'){
	cfg.build = default_object(cfg.build);
} else {
	def = default_object(cfg.build.html || './build');

	for(ni in def){
		cfg.build[ni] = cfg.build[ni] || def[ni];
	}
}

for(ni in cfg.build){
	cfg.build[ni] = path.resolve(cfg.build[ni]);
}

module.exports = cfg;
