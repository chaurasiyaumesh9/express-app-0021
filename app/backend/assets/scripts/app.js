var adminApp = angular.module('sampleCartAdmin', ['ngRoute','angularUtils.directives.dirPagination','ngMaterial','ngFileUpload']);

adminApp.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl : 'views/dashboard.html'
		})
		.when('/products', {
			templateUrl : 'views/products.html',
			controller: "productsCtrl"
		})
		.when('/products/add-new', {
			templateUrl : 'views/add-new-product.html',
			controller: "productsCtrl"
		})
		.when('/products/edit-view-product/:id', {
			templateUrl : 'views/edit-view-product.html',
			controller: "productsCtrl"
		})
		.when('/categories', {
			templateUrl : 'views/categories.html',
			controller: "categoriesCtrl"
		})

		.when('/categories/add-new', {
			templateUrl : 'views/add-new-category.html',
			controller: "categoriesCtrl"
		})
		.when('/categories/:id', {
			templateUrl : 'views/edit-view-category.html',
			controller: "categoriesCtrl"
		});
});

adminApp.controller('adminCtrl', function($scope){
	$scope.message = "Welcome to Dashboard!"; //just to check if controller is working fine..print the message!
});




var lib = {
	getCurrentDate: function(){
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();

		if(dd<10) {
			dd='0'+dd
		} 

		if(mm<10) {
			mm='0'+mm
		} 

		//today = mm+'-'+dd+'-'+yyyy;
		today = yyyy +'-'+ mm +'-'+ dd ;
		return today;
	}
}