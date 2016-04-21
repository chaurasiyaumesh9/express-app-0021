adminApp.controller('attributeSetsCtrl', function($scope, $http, $routeParams, attributeService, attributeSetsService, $timeout ){
	$scope.message = "Make New Attribute Set";
	
	//$scope.loadDefaults();
	

	$scope.loadDefaults = function(){
		$scope.set = { name:null, attributes:[] };// we'll be posting updated set of this data via submit form //attributeSet = {}
		$scope.attributesAvailable = [];
		getAllAttributes();
	}

	

	
	function getAllAttributes(){
		attributeService.getAllAttributes().then( function( response ){
			$scope.attributesAvailable = response;
		}, function( errorMessage ){
			console.warn( errorMessage );
		});
	}

	$scope.updateAttributesSelection = function( at ) {
		if ( $scope.set.attributes.indexOf( at ) == -1 && at.selected )
		{
			$scope.set.attributes.push( at );
		}else {
			var i = $scope.set.attributes.indexOf( at );
			$scope.set.attributes.splice( i,1 );
		}
	}

	$scope.selectAll = function(){
		for ( var x=0; x< $scope.attributesAvailable.length; x++ )
		{
			$scope.attributesAvailable[x].selected = true;
		}
		$scope.set.attributes = angular.copy( $scope.attributesAvailable );
	}

	$scope.deSelectAll = function(){
		$scope.set.attributes = [];
		for ( var x=0; x< $scope.attributesAvailable.length; x++ )
		{
			$scope.attributesAvailable[x].selected = false;
		}
	}

	$scope.addNew = function( set ){
		attributeSetsService.addNew( set ).then( function( response ){
			$scope.success = true;
			$scope.loadDefaults();
		}, function( errorMessage ){
			console.warn( errorMessage );
		});
	}
	$scope.getAll = function( ){
		$scope.loading = true;
		attributeSetsService.getAll( ).then( function( response ){
			$scope.loading = false;
			$scope.attributeSets = response;
		}, function( errorMessage ){
			console.warn( errorMessage );
		});
	}

	function getAllSets(){
		$scope.getAll();
	}
	$scope.getOneById = function( ){
		
	}
	$scope.updateOneById = function( ){
		
	}
	$scope.deleteOneById = function( ){
		
	}
	getAllSets();
});