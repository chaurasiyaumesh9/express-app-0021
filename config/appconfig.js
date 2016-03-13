var mongoose = require('mongoose');
var config = {};
config.db = {}
config.db.url = "mongodb://su:welcome123@ds011158.mlab.com:11158/sample2";

config.db.conn = mongoose.createConnection("mongodb://su:welcome123@ds011158.mlab.com:11158/sample2", {server:{poolSize:2}}, function(err){
	if (err) {
        console.log(err);
    }else{
		console.log('connected successfully!');
	}
});

module.exports = config;
