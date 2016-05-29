angular.module('sampleCartApp.controller').controller('cartCtrl', function( $scope, $rootScope, $http ){
	$scope.message = "View Your Cart!";

	//$scope.cart = $rootScope.cart || [];
	getCart().then(function( response ){
		console.log( 'getCart :',response)
		$rootScope.cart = response;
	}, function(errorMessage){
		console.log('getCart errorMessage : ',errorMessage);
	});
	function getCart(){
		var request = $http({
			method: "get",
			url: "/cart",
			params: {
				action: "get"
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