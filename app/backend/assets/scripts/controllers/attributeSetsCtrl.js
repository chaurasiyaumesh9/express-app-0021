adminApp.controller('attributeSetsCtrl', function($scope, $http, $routeParams, attributeService, $timeout ){
	$scope.message = "Make New Attribute Set";
	$scope.set = { attributesChosen:[], attributesAvailable:[]};

	getAllAttributes();


	function getAllAttributes(){
		attributeService.getAllAttributes().then( function( response ){
			$scope.set.attributesAvailable = response;
		}, function( errorMessage ){
			console.warn( errorMessage );
		});
	}

	$scope.updateAttributesSelection = function( at ) {
		if ( $scope.set.attributesChosen.indexOf( at ) == -1 && at.selected )
		{
			$scope.set.attributesChosen.push( at );
		}else {
			var i = $scope.set.attributesChosen.indexOf( at );
			$scope.set.attributesChosen.splice( i,1 );
		}
	}

	$scope.selectAll = function(){
		for ( var x=0; x< $scope.set.attributesAvailable.length; x++ )
		{
			$scope.set.attributesAvailable[x].selected = true;
		}
		$scope.set.attributesChosen = angular.copy( $scope.set.attributesAvailable );
	}

	$scope.deSelectAll = function(){
		$scope.set.attributesChosen = [];
		for ( var x=0; x< $scope.set.attributesAvailable.length; x++ )
		{
			$scope.set.attributesAvailable[x].selected = false;
		}
	}

	$scope.addNewAttributeSet = function( set ){
		// post request to server end point
	}
});