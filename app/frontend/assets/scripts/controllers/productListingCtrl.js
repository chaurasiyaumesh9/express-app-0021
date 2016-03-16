cartApp.controller('productListingCtrl', function( $scope, $routeParams, productService ){
	$scope.message = "Product Listing Page!"; //just for testing purpose
	if ( $routeParams.categoryUrl )
	{
		var cUrl = $routeParams.categoryUrl; // check if in edit/view mode
		var cId = $routeParams.categoryId;
		$scope.activeCategory = $scope.$parent.activeCategory;;
		$scope.loading = true;
		productService.getProductsByCategory( cUrl, cId ).then( function( response ){
			$scope.productList = response;
			$scope.loading = false;
		} , function(errorMessage ){ 
			console.warn( errorMessage );
		});
	}
});