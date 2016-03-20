var express    = require('express')   ;
var app = express();
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
	}
			
};


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
	//console.log('wfwef');
	products.getProductsByCategory(req, res);
});



module.exports = router;
