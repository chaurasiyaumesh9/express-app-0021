angular.module('sampleCartApp.controller').controller('productListingCtrl', function( $scope, $routeParams, productService, categoryService ){
	$scope.message = "Product Listing Page!"; //just for testing purpose
	$scope.layout = 'grid';
	$scope.filters = [
		{
			caption: "New",
			field: "date_added",
			reverse: true
		},
		{
			caption: "Price: Heigh To Low",
			field: "special_price || price",
			reverse: true
		},
		{
			caption: "Price: Low To Heigh",
			field: "special_price || price",
			reverse: false
		}	
	];


	
	$scope.loading = true;
	$scope.defaultFilter = {
		caption: "Sort By",
		field: "SKU",
		reverse: false
	};
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
	$scope.setActiveFilter = function( f ){
		$scope.activeFilter = f;
		$scope.sortType = f.field;
		$scope.sortReverse = f.reverse;
	}
	$scope.resetFilter = function(){
		$scope.activeFilter = {};
		$scope.sortType = "";
		$scope.sortReverse = "";
		$scope.setActiveFilter( $scope.defaultFilter );
	}
	$scope.setActiveFilter( $scope.defaultFilter ); //setting up default filter
});
