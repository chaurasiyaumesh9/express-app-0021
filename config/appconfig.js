var mongoose = require('mongoose');
var config = {};
config.db = { prod:{}, local:{}};
config.db.prod.url = "mongodb://su:welcome123@ds011158.mlab.com:11158/sample2";
config.db.local.url = "mongodb://localhost:27017/sample2";

config.db.conn = mongoose.createConnection( config.db.prod.url , {server:{poolSize:2}}, function(err){
	if (err) {
        console.log(err);
    }else{
		console.log('connected successfully!');
	}
});

module.exports = config;
