cartApp.controller('productListingCtrl', function( $scope, $routeParams, productService, categoryService ){
	$scope.message = "Product Listing Page!"; //just for testing purpose
	$scope.layout = 'grid';
	if ( $routeParams.categoryUrl )
	{
		var cUrl = $routeParams.categoryUrl; // check if in edit/view mode
		var cId = $routeParams.categoryId;
		$scope.activeCategory = $scope.$parent.activeCategory;;
		categoryService.getCategoryById( cId ).then( function( response ){
			console.log('getCategoryById response :', response);
			$scope.activeCategory = response.name;
		} , function(errorMessage ){ 
			console.warn( errorMessage );
		});
		
		$scope.loading = true;
		productService.getProductsByCategory( cUrl, cId ).then( function( response ){
			$scope.productList = response;
			$scope.loading = false;
		} , function(errorMessage ){ 
			console.warn( errorMessage );
		});
	}
});