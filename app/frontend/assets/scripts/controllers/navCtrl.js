cartApp.controller('navCtrl', function( $scope, $http, $location, $rootScope, categoryService ){
	getCategories();
	function getCategories(){
		categoryService.getActiveCategories().then( function( response ){
			$scope.categories = response;
		} , function(errorMessage ){ 
			console.warn( errorMessage );
		});
	}
	$scope.setActiveCategory = function( category ){
		$scope.activeCategory = category;
		$scope.loading = true;
	}
	$scope.logout = function(){
		$http.post('/logout').success( function(){
			$rootScope.activeUser = null;
			$location.url('/');
		});
	}
	
});
