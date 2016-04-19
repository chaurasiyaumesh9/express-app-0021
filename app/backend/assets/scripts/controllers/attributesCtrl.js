adminApp.controller('attributesCtrl', function($scope, $http, $routeParams, attributeService, $timeout ){
	$scope.message = "Manage Attributes";
	$scope.success = false;
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
});