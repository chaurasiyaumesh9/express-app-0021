cartApp.controller('defaultCtrl', function( $scope, categoryService ){
	getCategories();
	function getCategories(){
		categoryService.getActiveCategories().then( function( response ){
			$scope.categories = response;
		} , function(errorMessage ){ 
			console.warn( errorMessage );
		});
	}
	$scope.setActiveCategory = function( category ){
		//$scope.activeCategory = category.name;	
		$scope.activeCategory = category;
		$scope.loading = true;
	}
	
});
