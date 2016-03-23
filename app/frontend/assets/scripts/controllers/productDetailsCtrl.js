cartApp.controller('productDetailsCtrl', function( $scope, $routeParams, productService, categoryService ){
	
	$scope.message = "Product Details Page!"; //just for testing purpose
	$scope.activeSlide = 0;
	if ( $routeParams.cid && $routeParams.pid )
	{
		
		var cId = $routeParams.cid;
		var pId = $routeParams.pid;
		$scope.loading = true;
		productService.getProductById( pId ).then( function( response ){
			//console.log('response :',response);
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

	$scope.switchThumbView = function( index ){
		//console.log('switchThumbView :',index)
		$scope.activeSlide = index;
	}
	/*$scope.$on('ngRepeatFinished', function (ngRepeatFinished) {
		console.log('called');
	});*/
});