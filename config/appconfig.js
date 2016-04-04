var mongoose = require('mongoose');
var config = {};
config.db = { prod:{}, local:{}};
config.db.prod.url = "mongodb://su:welcome123@ds011158.mlab.com:11158/sample2";
config.db.local.url = "mongodb://localhost:27017/sample2";

/*config.social = {
	facebook:{
		'appID' : '241587526185299',
		'appSecret' : '18a3f5127a5b531895954881979eaa70',
		'callbackURL' : 'http://localhost:8010/auth/facebook/callback'
	}
}*/


config.social = {
	facebook:{
		'appID' : '186717428358345',
		'appSecret' : '944c1475e78d85d4a3c8537dcb96d442',
		'callbackURL' : 'http://localhost:8010/auth/facebook/callback'
	}
}


config.db.conn = mongoose.createConnection( config.db.prod.url , {server:{poolSize:2}}, function(err){
	if (err) {
        console.log(err);
    }else{
		console.log('connected successfully!');
	}
});

module.exports = config;
