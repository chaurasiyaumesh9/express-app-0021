angular.module('sampleCartApp.controller').controller('productListingCtrl', function( $scope, $rootScope, $routeParams, productService, categoryService, $http ){
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
	}else{
		getTop100Products();
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

	function getTop100Products(){

		productService.getAllProducts( ).then( function( response ){
			//console.log('response :',response);
			$scope.listingTitle = "TOP 50 PRODUCT(S)";
			$scope.productList = response;
			$scope.loading = false;
		} , function(errorMessage ){ 
			console.warn( errorMessage );
		});
	}
	$scope.addToCart = function( product ){
		addToCart( product ).then( function(response){
			console.log('addToCart :',response);
			$rootScope.cart = response;
		}, function(errorMessage){
			console.log('addToCart errorMessage : ',errorMessage);
		});
	}
	function addToCart( product ){
		var request = $http({
            method: "post",
            url: "/cart",
            params: {
                action: "add"
            },
            data: {
                product: product
            }
        });
        return( request.then( handleSuccess, handleError ) );
	}
	function handleError( response ) {
		if ( ! angular.isObject( response.data ) || ! response.data.message ) {
			return( $q.reject( "An unknown error occurred." ) );
		}
		// Otherwise, use expected error message.
		return( $q.reject( response.data.message ) );
	}
	function handleSuccess( response ) {
		//console.log( typeof response.data );
		if( typeof response.data =='object' ){
			return( response.data );
		}	
		else{
			return;		
		}
		
	}	
});
