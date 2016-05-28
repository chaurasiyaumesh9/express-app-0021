angular.module('sampleCartApp.controller').controller('cartCtrl', function( $scope, $rootScope ){
	$scope.message = "View Your Cart!";

	$scope.cart = $rootScope.cart || [];


});