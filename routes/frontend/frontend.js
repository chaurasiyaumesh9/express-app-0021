var express    = require('express')   ;
var router= express.Router();
var appconfig = require('../../config/appconfig');
var CategorySchema = require('../../models/category');
var ProductSchema = require('../../models/product');
var mongoose = require('mongoose');

var Product = appconfig.db.conn.model('Product', ProductSchema);
var Category = appconfig.db.conn.model('Category', CategorySchema);

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
		Product.find({ discontinued:false }, function(err, results) {
		  if (!err)
			{
				res.json( results );
			}else{
				console.log('Error while performing the query..check function products.getProductList() for more details..', err );
			}
		});

	},
	getProductsByCategory: function (req, res){
		//var cUrl = req.params.categoryUrl;
		var cId = req.params.cid;
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
		var pId = req.params.pid;
		//console.log('pId :',pId);
		Product.find( { _id: pId , discontinued:{$ne: true} } , function(err, results) {
			if (!err)
			{
				//console.log('results :',results);
				res.json( results[0] );
			}else{
				console.log('Error while performing the query..check function products.getProductsByCategory() for more details..', err );
			}
		});
	}
			
};
module.exports = function( passport ){
	router.get('/categories', function(req, res){
		categories.getCategories( req, res );
	});

	router.get('/categories/:id', function(req, res){
		categories.getCategoryById( req, res );
	});

	router.get('/products', function(req, res){
		products.getProductList(req, res);
	});
	router.get('/products/:cid', function(req, res){
		products.getProductsByCategory(req, res);
	});

	router.get('/product/:pid', function(req, res){
		products.getProductById(req, res);
	});

	router.post('/login', function(req, res, next) {
	  passport.authenticate('local-login', function(err, user, info) {
		if (err) { return next(err); }
		if (!user) { 
			res.json( {message: req.flash('loginMessage')[0] } );
			return false;
		}
		req.logIn(user, function(err) {
		  if (err) { return next(err); }
		  res.json( {user :user });
		});

	  })(req, res, next);
	});

	return router;
}