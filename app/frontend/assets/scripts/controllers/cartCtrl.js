angular.module('sampleCartApp.controller').controller('cartCtrl', function( $scope, $rootScope, cartService ){
	$scope.message = "View Your Cart!";
	//$scope.cart = $rootScope.cart || [];
	cartService.getCart().then(function( response ){
		//console.log( 'getCart :',response)
		$rootScope.cart = response;
		$scope.cart = response;
		$scope.cartTotal = cartService.getTotal( $scope.cart );
	}, function(errorMessage){
		console.log('getCart errorMessage : ',errorMessage);
	});

	$scope.getCartTotalValue = function(){
		$scope.cartTotal = cartService.getTotal( $scope.cart );
	}

	$scope.updateCart = function( cart ){
		cartService.updateCart( cart ).then(function( response ){
			//console.log( 'updateCart :',response)
			$rootScope.cart = response.cart;
			$scope.cart = response.cart;
			$scope.cartTotal = cartService.getTotal( $rootScope.cart );
			$rootScope.alerts.push({type:"success", msg:  response.message });
		}, function(errorMessage){
			console.log('updateCart errorMessage : ',errorMessage);
		});
	}
	$rootScope.closeAlert = function(index) {
		$rootScope.alerts.splice(index, 1);
  	};

  	$scope.removeFromCart = function( product ){
  		var index = $scope.cart.indexOf( product );
  		if( index >=0 ){
  			$scope.cart.splice(index,1);
  			$rootScope.alerts.push({type:"danger", msg:  "Product Removed!" });
  		}
  	}

  	function triggerCartUpdate(){
  		for( var i=0; i<$scope.cart.length; i++){
  			var product = $scope.cart[i];
  			$scope.$watch(product.qty, function(newVal, oldVal){
  				console.log('newVal : ',newVal, ', oldVal : ',oldVal);
  			})
  		}
  	}

	
});