cartApp.controller('productListingCtrl', function( $scope, $routeParams, productService, categoryService ){
	$scope.message = "Product Listing Page!"; //just for testing purpose
	$scope.layout = 'grid';
	
	$scope.loading = true;
	if ( $routeParams.cid )
	{
		//var cUrl = $routeParams.curl; // check if in edit/view mode
		var cId = $routeParams.cid;
		$scope.activeCategory = $scope.$parent.activeCategory;;
		$scope.loading = true;
		categoryService.getCategoryById( cId ).then( function( response ){
			//console.log('getCategoryById response :', response);
			$scope.activeCategory = response;
		} , function(errorMessage ){ 
			console.warn( errorMessage );
		});
		
		productService.getProductsByCategory( cId ).then( function( response ){
			//console.log('response :',response);
			$scope.productList = response;
			$scope.loading = false;
		} , function(errorMessage ){ 
			console.warn( errorMessage );
		});
	}
});