adminApp.controller('attributesCtrl', function($scope, $http, $routeParams, attributeService, $timeout ){
	$scope.message = "Manage Attributes";
	$scope.success = false;
	$scope.showDelete = false;
	$scope.deletionSuccess = false;
	$scope.updationSuccess = false;
	$scope.deleteCount = 0;
	var categoryId = -1;
	$scope.loadDefaults = function(){
		$scope.attribute = { };
	}
	getAllAttributes();
	$scope.addNewAttribute = function( attribute ){
		//console.log('addNewAttribute :',attribute);
		attributeService.addNewAttribute( attribute ).then( function( response ){
			$scope.success = true;
			$scope.loadDefaults();
		}, function( errorMessage ){
			console.warn( errorMessage );
		});
	}

	$scope.updateAttribute = function( attribute ){
		//console.log('updateAttribute :',attribute);
		attributeService.updateAttribute( attribute ).then( function( response ){
			$scope.updationSuccess = true;
		}, function( errorMessage ){
			console.warn( errorMessage );
		});
	}

	function getAllAttributes(){
		$scope.loading = true;
		attributeService.getAllAttributes().then( function( response ){
			$scope.attributes = response;
			$scope.loading = false;
		}, function( errorMessage ){
			console.warn( errorMessage );
		});
	}

	if ( $routeParams.id )
	{
		attributeId = $routeParams.id; // check if in edit mode
		attributeService.getAttributeById( attributeId ).then( function( response ){
			$scope.attribute = response;
		} , function(errorMessage ){ 
			console.warn( errorMessage );
		});
	}

	$scope.deleteAttributes = function(){
		var checked = getCheckedAttributes();
		
		for ( var i=0; i<checked.length ;i++ )
		{ 
			attributeService.deleteAttribute( checked[i]._id ).then( function( response ){
				getAllAttributes();
				$scope.deleteCount++;
			}, function( errorMessage ){
				console.warn( errorMessage );
			});
		}
		$scope.deletionSuccess = true;
	}
	
	$scope.checkAll = function () {
        angular.forEach($scope.attributes, function (category) {
            category.selected = $scope.selectAll;
        });
		 toggleDeleteButton();
    };
	
	 $scope.checkIndividual = function ( ) {
		 if ( getCheckedAttributes().length < $scope.attributes.length )
		 {
			$scope.selectAll = false;
		 }
		toggleDeleteButton();		
    };
	function toggleDeleteButton(){
		if ( getCheckedAttributes().length >0 )
		 {
			$scope.showDelete = true;
		 }else{
			$scope.showDelete = false;
		 }
	}

	function getCheckedAttributes(){
		var arr = [];
		for (var i=0; i<$scope.attributes.length ;i++ )
		{
			if ( $scope.attributes[i].selected )
			{
				arr.push( $scope.attributes[i] );
			}	
		}
		return arr;
	}
});