
angular.module('sampleCartApp.controller').controller('productDetailsCtrl', function( $scope, $routeParams, productService, categoryService, $rootScope ){
	
	$scope.message = "Product Details Page!"; //just for testing purpose
	$scope.activeSlide = 0;
	if ( $routeParams.pid )
	{
		
		//var cId = $routeParams.cid;
		var pId = $routeParams.pid;
		$scope.loading = true;
		//console.log('pId :',pId);
		productService.getProductById( pId ).then( function( response ){
			//console.log('response :',response);

			$scope.product = response;
			$rootScope.activeProduct = response; //setting up the root scope to access full mode
			$scope.loading = false;
		} , function(errorMessage ){ 
			console.warn( errorMessage );
		});
		
		/*categoryService.getCategoryById( cId ).then( function( response ){
			//console.log('getCategoryById response :', response);
			$scope.activeCategory = response;
			$rootScope.activeCategory = response; //setting up the root scope to access full mode
		} , function(errorMessage ){ 
			console.warn( errorMessage );
		});*/
		
	}
	$scope.switchThumbView = function( index ){
		$scope.activeSlide = index;
		$rootScope.activeSlide = index; //setting up the root scope to access full mode
	}
});