cartApp.controller('defaultCtrl', function( $scope, categoryService ){
	getCategories();
	function getCategories(){
		categoryService.getActiveCategories().then( function( response ){
			$scope.categories = response;
		} , function(errorMessage ){ 
			console.warn( errorMessage );
		});
	}
	$scope.setCurrentCategory = function( category ){
		$scope.activeCategory = category.name;	
	}
	
});
