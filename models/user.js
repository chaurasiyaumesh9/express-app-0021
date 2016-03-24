var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	local:{
		username: String,
		password: String
	},
	facebook: {
		id: String,
		token: String,
		email: String,
		name: String
	}
});

/*
UserSchema.methods.generateHash = function( password ){
	return bcrypt.hashSync( password, bcrypt.genSaltSync(9));
}
UserSchema.methods.validPassword = function( password ){
	return bcrypt.compareSync( password, this.local.password );
}
*/

/*
UserSchema.pre('save', function(next) {
  // get the current date
  this.is_deleted = false; //deleted false by default as of now
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if date_added doesn't exist, add to that field
  if (!this.date_added)
    this.date_added = currentDate;

  next();
}); */

var User = mongoose.model('User', UserSchema);

module.exports = User;