cartApp.controller('productDetailsCtrl', function( $scope, $routeParams, productService, categoryService ){
	
	$scope.message = "Product Details Page!"; //just for testing purpose
	if ( $routeParams.cid && $routeParams.pid )
	{
		
		var cId = $routeParams.cid;
		var pId = $routeParams.pid;
		$scope.loading = true;
		productService.getProductById( pId ).then( function( response ){
			$scope.product = response;
			$scope.loading = false;
		} , function(errorMessage ){ 
			console.warn( errorMessage );
		});
		
		
		categoryService.getCategoryById( cId ).then( function( response ){
			//console.log('getCategoryById response :', response);
			$scope.activeCategory = response;
		} , function(errorMessage ){ 
			console.warn( errorMessage );
		});
		
	}
});