var mongoose = require('mongoose');
var config = {};
config.db = { prod:{}, local:{}};
config.db.prod.url = "mongodb://su:welcome123@ds011158.mlab.com:11158/sample2";
config.db.local.url = "mongodb://localhost:27017/sample2";

config.social = {
	prod:{
		facebook:{
			'appID' : '241587526185299',
			'appSecret' : '18a3f5127a5b531895954881979eaa70',
			'callbackURL' : 'https://meanstack-ecommerce.herokuapp.com/auth/facebook/callback'
		},
		google : {
			'clientID'      : '526393992694-sg6r84d43ug69pgom7nc3dji63gu8828.apps.googleusercontent.com',
			'clientSecret'  : 'CT2IQl5-28IEuPgJvp2c5CSo',
			'callbackURL'   : 'https://meanstack-ecommerce.herokuapp.com/auth/google/callback'
		}
	},
	dev:{
		facebook:{
			'appID' : '186717428358345',
			'appSecret' : '944c1475e78d85d4a3c8537dcb96d442',
			'callbackURL' : 'http://localhost:8010/auth/facebook/callback'
		},
		google : {
			'clientID'      : '526393992694-dvisp8huvamp90frpduj8fpc5g8vteat.apps.googleusercontent.com',
			'clientSecret'  : 'tCYwHquzLPlHxmjTHbxKWKi4',
			'callbackURL'   : 'http://localhost:8010/auth/google/callback'
		}
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

