var express    = require('express')   ;
var router= express.Router();
var appconfig = require('../../config/appconfig');


var productsRoute = require('./products')( router );
var categoriesRoute = require('./categories')( router);
var attributesRoute = require('./attributes')( router);


module.exports = router;
