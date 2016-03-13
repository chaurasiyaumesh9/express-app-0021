var cartApp = angular.module('sampleCartApp', ['ngRoute']);
/*
cartApp.config(function( $routeProvider, $locationProvider ) {
	$routeProvider

		// route for the home page
		.when('/', {
			templateUrl : 'pages/homepage.html',
			controller:'homeCtrl'
		});

});*/

cartApp.controller('homeCtrl', function( $scope, $http ){
	$scope.message = "Home page Content Goes Here!";
	
});

cartApp.filter('yesNo', function() {
	//{{ category.active | yesNo }}
    return function(input) {
        return input ? 'Yes' : 'No';
    }
});

cartApp.filter('smallImg', function( ){
	return function( arr ){
		for (var i=0;i<arr.length ;i++ )
		{
			if ( arr[i].role['small'])
			{
				return arr[i]['url'];
			}
		}
	}
});

cartApp.filter('filterProductsByCategory', function( ){
	return function( list, searchCategory ){
		if ( !list )
		{
			return [];
		}
		if ( !searchCategory.name ) //checking if no category then load all
		{
			return list;
		}
		var out = [];
		angular.forEach(list, function( product ){
			angular.forEach( product.categories, function( category ){
				if ( category._id === searchCategory._id && category.selected )
				{
					out.push( product );
				}
			});
		});
		return out;
	  }
});



cartApp.controller('sampleCartAppCtrl', function( $scope, $http ){
	$scope.currentCategory = {};
	loadRemoteData();
	
	function loadRemoteData(){
		$http.get('/categories').success( function( response ){
			$scope.categories = response;
		});
	}
	
	loadAllProducts();
	function loadAllProducts(){
		$scope.loading = true;
		$http.get('/products').success( function( response ){
			$scope.productList = response;
			$scope.loading = false;
		});
	}

	$scope.loadCategoryProducts = function( category ){
		$scope.currentCategory = category;
		console.log('$scope.productsCategory :',$scope.currentCategory);
	}

});