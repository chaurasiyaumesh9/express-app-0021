var cartApp = angular.module('sampleCartApp', ['ngRoute']);

cartApp.config(function( $routeProvider, $locationProvider ) {
	$routeProvider
		.when('/', {
			templateUrl : 'views/homepage.html',
			controller:'hompageCtrl'
		})
		.when('/products/:categoryUrl/:categoryId', {
			templateUrl : 'views/product-listing.html',
			controller:'productListingCtrl'
		});
});