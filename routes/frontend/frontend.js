var express    = require('express')   ;
var router= express.Router();
var appconfig = require('../../config/appconfig');
var CategorySchema = require('../../models/category');
var ProductSchema = require('../../models/product');
var mongoose = require('mongoose');

var Product = appconfig.db.conn.model('Product', ProductSchema);
var Category = appconfig.db.conn.model('Category', CategorySchema);


// note added
var categories = {
	getCategories: function (req, res){
		Category.find({active:true}, function(err, results) {
		  if (!err)
			{
			 	res.json( results );
			}else{
				console.log('Error while performing the query..check function categories.getCategories() for more details..', err );
			}
		});
	},
	getCategoryById: function(req, res){
		Category.findById( req.params.id, function(err, results) {
			if (!err)
			{
				res.json( results );
			}else{
				console.log('Error while performing the query..check function categories.getCategoryById() for more details..', err );
			}
		});
	}
};

var products = {
	getProductList: function (req, res){
		Product.find({ discontinued:{$ne: true} }, function(err, results) {
		  if (!err)
			{
				//db.foo.find().sort({date_added:-1}).limit(50);

				res.json( results );
			}else{
				console.log('Error while performing the query..check function products.getProductList() for more details..', err );
			}
		}).sort({date_added:-1}).limit(5);

	},
	getProductsByCategory: function ( req, res, next ){
		//var cUrl = req.params.categoryUrl;
		//console.log('cid : ', req.param('cid'));
		var cId = req.cid;
		//console.log('cId :',cId);
		Product.find( { categories: { $elemMatch: { selected: true, _id: cId } }, discontinued:{$ne: true} } , function(err, results) {
			if (!err)
			{
				res.json( results );
			}else{
				console.log('Error while performing the query..check function products.getProductsByCategory() for more details..', err );
			}
		});
	},
	getProductById: function (req, res){
		//var cUrl = req.params.categoryUrl;
		var pId = req.pid;
		//console.log('pId :',pId);
		Product.find( { _id: pId , discontinued:{$ne: true} } , function(err, results) {
			if (!err)
			{
				//console.log('results :',results);
				res.json( results[0] );
			}else{
				console.log('Error while performing the query..check function products.getProductById() for more details..', err );
			}
		});
	}
			
};
module.exports = function( passport ){
	router.use( function(req, res, next ){
		//console.log('executing route:');
		if ( req.user )
		{
			//console.log('user found :',req.user );
			// got the user
		}
		next();
	});
	
	router.param('cid', function(req, res, next, cid) {
		var modified = cid ;
		req.cid = modified;
		next();
	});
	router.param('pid', function(req, res, next, pid) {
		var modified = pid ;
		req.pid = modified;
		next();
	});



	
	router.get('/categories', categories.getCategories );
	router.get('/categories/:id', categories.getCategoryById );
	router.get('/products', products.getProductList);
	router.get('/products/:cid', products.getProductsByCategory );
	router.get('/product/:pid', products.getProductById);

	

	router.post('/login', function(req, res, next) {
	  passport.authenticate('local-login', function(err, user, info) {
		if (err) { return next(err); }
		if (!user) { 
			var message = req.flash('loginMessage')[0];
			res.json( {message: message } );
			return false;
		}
		req.logIn(user, function(err) {
		  if (err) { return next(err); }
		  res.json( {user :user });
		});

	  })(req, res, next);
	});

	router.post('/logout', function( req, res ){
		req.logOut();
		res.sendStatus( 200 );
	});

	router.post('/signup', function(req, res, next) {
	  passport.authenticate('local-signup', function(err, user, info) {
		if (err) { return next(err); }
		if ( !user ) { 
			var message = req.flash('signupMessage')[0];
			res.json( {message: message } );
			return false;
		}
		if (user) { 
			req.logIn(user, function(err) {
			  if (err) { return next(err); }
			  res.json( {user :user });
			});
		}
	  })(req, res, next);
	});

	router.get('/loggedin', function( req, res ){
		res.send( req.isAuthenticated()?req.user: '0')
	});
	router.post('/cart', function( req, res ){
		var cart = req.session.cart || [];  
		cart.push(req.body.product);
		//res.redirect('/cart');
	});
	router.get('/cart', function( req, res, next ){
		var cart = req.session.cart || [];
		res.send( cart );
	});

	/*router.get('/auth/facebook', function(req, res, next) {
	  passport.authenticate('facebook', { scope : 'email' }, function(err, user, info) {
		if (err) { return next(err); }
		
		if (user) { 
			req.logIn(user, function(err) {
			  if (err) { return next(err); }
			  res.json( {user :user });
			});
		}
		//console.log('get request recieved!');
	  })(req, res, next);
	});*/

	
	//router.get('/auth/facebook', passport.authenticate('facebook', { scope : ['publish_actions','email'] }));
	router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
	router.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect : '/#/profile', failureRedirect : '/login' }) );
	router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    router.get('/auth/google/callback',	passport.authenticate('google', {successRedirect : '/#/profile',failureRedirect : '/login'}));
	router.get('/auth/twitter', passport.authenticate('twitter'));
    router.get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect : '/#/profile',failureRedirect : '/login' }));


	return router;
}