var express    = require('express')   ;
var app = express();
var router= express.Router();
var appconfig = require('../../config/appconfig');
var CategorySchema = require('../../models/category');
var ProductSchema = require('../../models/product');
var multer  =   require('multer');
var fs = require('fs');  
var mongoose = require('mongoose');

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '././uploads');
  },
  filename: function (req, file, callback) {
	 // console.log(req.params.id );
	  var pid = req.params.id;
    //callback(null, file.fieldname + '-' + Date.now());
	var datetimestamp = Date.now();
	var newFileName = file.fieldname + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
	var url = "../../uploads/" + newFileName;
	callback(null, newFileName );
  }
});
//var upload = multer({ storage : storage}).array('productPic', 12);

var Product = appconfig.db.conn.model('Product', ProductSchema);
var Category = appconfig.db.conn.model('Category', CategorySchema);

var categories = {
	getCategories: function (req, res){
		Category.find({}, function(err, results) {
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
	},
	addNewCategory: function(req, res){
		if ( !req.body.category )
		{
			return;
		}
		var category = req.body.category;
		var NewCategory = new Category( category );
		NewCategory.save(function(err) {
			if (!err)
			{
				res.json({});
			}else{
				console.log('Error while performing the query..check function categories.addNewCategory() for more details..', err );
			}
		});
	},
	deleteCategory: function(req, res){
		Category.findByIdAndRemove( req.params.id, function(err) {
			if (!err)
			{
				res.json({});
			}else{
				console.log('Error while performing the query..check function categories.deleteCategory() for more details..', err );
			}
		});
	},
	updateCategory: function(req, res){
		if ( !req.body.category )
		{
			return;
		}
		var updatedCategory = req.body.category;
		Category.findByIdAndUpdate(updatedCategory._id, updatedCategory, function(err, category) {
		  if (!err)
			{
				res.json( category );
			}else{
				console.log('Error while performing the query..check function categories.updateCategory() for more details..', err );
			}
		});
	}
};

var products = {
	getProductList: function (req, res){
		/*Product.find({ is_deleted: false }, function(err, results) {
		  if (!err)
			{
				res.json( results );
			}else{
				console.log('Error while performing the query..check function products.getProductList() for more details..', err );
			}
		});*/
		Product.find({ }, function(err, results) {
		  if (!err)
			{
				res.json( results );
			}else{
				console.log('Error while performing the query..check function products.getProductList() for more details..', err );
			}
		});

	},
	getProductById: function (req, res){
		var pid = req.params.id;

		Product.findById( pid, function(err, product ) {
			if (!err)
			{
				res.json( product );
			}else{
				console.log('Error while performing the query..check function products.getProductById() for more details..', err );
			}
		});
	},
	addNewProduct: function(req, res){
		console.log('invoking addNewProduct....');
		if ( !req.body.product )
		{
			return;
		}
		var product = req.body.product ;		
		var NewProduct = new Product( product );
		//console.log('NewProduct :',NewProduct );
		
		NewProduct.save(function(err, product ) {
			if (!err)
			{
				res.json( product );
			}else{
				console.log('Error while performing the query..check function products.addNewProduct() for more details..', err );
			}
		});
		
	},
	uploadImages: function( req, res ){
		var upload = multer({ storage : storage, inMemory: true }).single('productPic');
		upload( req,res,function(err) {
			if(err) {
				console.log( err );
				return res.end("Error uploading file.",err);
			}else{
				var file = req.file;
				var path = "../uploads/" + file.filename;
				var img = {
					url:  path,
					size: file.size
				}
					res.json( {image: img} );
			}
			//res.redirect("/");
		});
		
	},
	updateProduct: function(req, res){
		//console.log('updateProduct');
		if ( !req.body.product )
		{
			return;
		}
		var updatedProduct = req.body.product ;
		//console.log('updatedProduct :',updatedProduct );
		Product.findByIdAndUpdate( updatedProduct._id, updatedProduct, function(err, product) {
		  if (!err)
			{
				res.json( product );
			}else{
				console.log('Error while performing the query..check function products.updateProduct() for more details..', err );
			}
		});
	},
	deleteProduct: function(req, res){
		Product.findByIdAndRemove( req.params.id, function(err) {
			if (!err)
			{
				res.json({});
			}else{
				console.log('Error while performing the query..check function products.deleteProduct() for more details..', err );
			}
		});
		/*Product.findByIdAndUpdate( req.params.id , {is_deleted: true}, function(err) {
		  if (!err)
			{
				res.json( {} );
			}else{
				console.log('Error while performing the query..check function products.deleteProduct() for more details..', err );
			}
		});*/
	}
};


router.get('/categories', function(req, res){
	categories.getCategories( req, res );
});

router.get('/categories/:id', function(req, res){
	categories.getCategoryById( req, res );
});

router.put('/categories/:id', function(req, res){
	categories.updateCategory( req, res );
});

router.post('/categories', function(req, res){
	categories.addNewCategory( req, res );
});

router.delete('/categories/:id', function(req, res){
	categories.deleteCategory( req, res );
});


router.get('/products', function(req, res){
	products.getProductList(req, res);
});
router.get('/products/:id', function(req, res){
	products.getProductById(req, res);
});

router.put('/products/:id', function(req, res){
	products.updateProduct( req, res );
});
router.post('/products', function(req, res){
	products.addNewProduct( req, res );
});
router.post('/uploads', function(req, res){
	products.uploadImages( req, res );
});
router.delete('/products/:id', function(req, res){
	products.deleteProduct( req, res );
});



module.exports = router;
