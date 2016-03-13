adminApp.controller('categoriesCtrl', function($scope, $http, $routeParams, categoryService, $timeout ){
	$scope.message = "Manage Categories";
	
	$scope.showDelete = false;
	$scope.deletionSuccess = false;
	$scope.updationSuccess = false;
	$scope.deleteCount = 0;
	var categoryId = -1;

	if ( $routeParams.id )
	{
		categoryId = $routeParams.id; // check if in edit mode
		//console.log('categoryId:',categoryId);
		categoryService.getCategoryById( categoryId ).then( function( response ){
			$scope.category = response;
		} , function(errorMessage ){ 
			console.warn( errorMessage );
		});
	}
	$scope.loadDefaults = function(){
		$scope.category = {active:false};
	}
	getAllCategories();

	
	function getAllCategories(){
		categoryService.getAllCategories().then( function( response ){
			$scope.categories = response;
		}, function( errorMessage ){
			console.warn( errorMessage );
		});
	}

	$scope.updateCategory = function( category ){
		//console.log('category:',category);
		category.updated_at = new Date();
		categoryService.updateCategory( category ).then( function( response ){
			$scope.updationSuccess = true;
		}, function( errorMessage ){
			console.warn( errorMessage );
		});
	}

	$scope.addNewCategory = function( category ){
		categoryService.addNewCategory( category ).then( function( response ){
			$scope.success = true;
			$scope.loadDefaults();
		}, function( errorMessage ){
			console.warn( errorMessage );
		});
	}

	$scope.deleteCategories = function(){
		var checked = getCheckedCategories();
		
		for ( var i=0; i<checked.length ;i++ )
		{ 
			categoryService.deleteCategory( checked[i]._id ).then( function( response ){
				getAllCategories();
				$scope.deleteCount++;
			}, function( errorMessage ){
				console.warn( errorMessage );
			});
		}
		$scope.deletionSuccess = true;
	}

	 $scope.checkAll = function () {
        angular.forEach($scope.categories, function (category) {
            category.selected = $scope.selectAll;
        });
		 toggleDeleteButton();
    };
	
	 $scope.checkIndividual = function ( ) {
		 if ( getCheckedCategories().length < $scope.categories.length )
		 {
			$scope.selectAll = false;
		 }
		toggleDeleteButton();		
    };
	function toggleDeleteButton(){
		if ( getCheckedCategories().length >0 )
		 {
			$scope.showDelete = true;
		 }else{
			$scope.showDelete = false;
		 }
	}

	function getCheckedCategories(){
		var arr = [];
		for (var i=0; i<$scope.categories.length ;i++ )
		{
			if ( $scope.categories[i].selected )
			{
				arr.push( $scope.categories[i] );
			}	
		}
		return arr;
	}

});