angular.module('sampleCartApp.controller').controller('cartCtrl', function( $scope, $rootScope, cartService ){
	$scope.message = "View Your Cart!";

	//$scope.cart = $rootScope.cart || [];
	cartService.getCart().then(function( response ){
		//console.log( 'getCart :',response)
		$rootScope.cart = response;
		$scope.cartTotal = cartService.getTotal( $rootScope.cart );
	}, function(errorMessage){
		console.log('getCart errorMessage : ',errorMessage);
	});



});