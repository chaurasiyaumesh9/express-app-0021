var appconfig = require('../../config/appconfig');
var UserSchema            = require('../../models/user');
var LocalStrategy   = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var User = appconfig.db.conn.model('User', UserSchema);


module.exports = function( passport ){
	
	passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
		var message = {};
        User.findOne({ 'local.email' :  email }, function(err, user) {
            if (err){
				return done(err);
			}
            if (!user){
                return done(null, false, req.flash('loginMessage', 'No user found.')); 
			}
		    if (!user.validPassword(password)){
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); 
			}
            return done(null, user, req.flash('loginMessage', 'Login Successful!'));
        });

    }));

	passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        process.nextTick(function() {
        User.findOne({ 'local.email' :  email }, function(err, user) {
			console.log('signup server - err :', err );
			console.log('signup server - user :', user );
            if (err){
                return done(err);
			}
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
                var newUser = new User();
                newUser.local.email    = email;
				newUser.local.displayName    = req.body.displayName;
                newUser.local.password = newUser.generateHash(password);
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }
        });    
     });

    }));

	passport.use(new FacebookStrategy({
		clientID        : process.env.NODE_ENV=="production"? appconfig.social.prod.facebook.appID : appconfig.social.dev.facebook.appID,
		clientSecret    : process.env.NODE_ENV=="production"? appconfig.social.prod.facebook.appSecret : appconfig.social.dev.facebook.appSecret,
		//passReqToCallback : true,
		//profileFields: ["emails", "displayName"],
		callbackURL     : process.env.NODE_ENV=="production"? appconfig.social.prod.facebook.callbackURL: appconfig.social.dev.facebook.callbackURL
	}, function(accessToken, refreshToken, profile, done) {
		process.nextTick(function() {
			//console.log('profile :',profile);
			User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
				if (err){
					//console.log("err :",err);
					return done(err);
				}
				if (user) {
					//console.log("user alredy exist! :",user);
					return done(null, user); // user found, return that user
				} else {
					
					// if there is no user found with that facebook id, create them
					var newUser  = new User();

					// set all of the facebook information in our user model
					newUser.facebook.id    = profile.id; // set the users facebook id  
					newUser.facebook.name = profile.displayName;
					newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
					//newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
					newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
					newUser.save(function(err) {
						if (err){
							//console.log("Error in saving :",err);
							throw err;
						}
						return done(null, newUser);
					});
				}

			}); 
		});
	 }));

	passport.serializeUser( function( user, done ){
		done(null, user);	
	});

	passport.deserializeUser( function( user, done ){
		done(null, user);	
	});
}

