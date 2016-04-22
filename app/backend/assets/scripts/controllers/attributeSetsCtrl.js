adminApp.controller('attributeSetsCtrl', function($scope, $http, $routeParams, attributeService, attributeSetsService, $timeout ){
	$scope.message = "Make New Attribute Set";
	
	$scope.loadDefaults = function(){
		$scope.set = { name:null, attributes:[] };// we'll be posting updated set of this data via submit form //attributeSet = {}
		$scope.attributesAvailable = [];
		$scope.bool = [];
		getAllAttributes();
	}

	function getAllAttributes(){
		attributeService.getAllAttributes().then( function( response ){
			$scope.attributesAvailable = response;
		}, function( errorMessage ){
			console.warn( errorMessage );
		});
	}

	$scope.addNew = function( set ){
		$scope.loading = true;
		attributeSetsService.addNew( set ).then( function( response ){
			$scope.success = true;
			$scope.loading = false;
			$scope.loadDefaults();
		}, function( errorMessage ){
			console.warn( errorMessage );
		});
	}
	$scope.getAllSets = function( ){
		$scope.loading = true;
		attributeSetsService.getAll( ).then( function( response ){
			$scope.loading = false;
			$scope.attributeSets = response;
		}, function( errorMessage ){
			console.warn( errorMessage );
		});
	}

	function getAllSets(){
		$scope.getAllSets();
	}

	$scope.getOneById = function( id ){
		$scope.loading = true;
		attributeSetsService.getOneById( id ).then( function( response ){
			$scope.set = response;
			$scope.loading = false;
		} , function(errorMessage ){ 
			console.warn( errorMessage );
		});
	}
	$scope.updateOneById = function( set ){
		set.updated_at = new Date();
		$scope.loading = true;
		attributeSetsService.updateOneById( set ).then( function( response ){
			$scope.success = true;
			$scope.loading = false;
		}, function( errorMessage ){
			console.warn( errorMessage );
		});
	}
	$scope.deleteOneById = function( ){
		
	}
	getAllSets();
	if ( $routeParams.id )
	{
		var setId = $routeParams.id; // check if in edit mode
		$scope.getOneById( setId );
	}

	$scope.isChecked = function( id ){
      var match = false;
      for(var i=0 ; i < $scope.set.attributes.length; i++) {
        if( $scope.set.attributes[i]._id == id ){
          match = true;
        }
      }
      return match;
  };
  $scope.sync = function(bool, item){
    if(bool){
      $scope.set.attributes.push(item);
    } else {
      for(var i=0 ; i < $scope.set.attributes.length; i++) {
        if($scope.set.attributes[i]._id == item._id){
          $scope.set.attributes.splice(i,1);
        }
      }      
    }
  };
  $scope.selectAll = function(){
		$scope.set.attributes = angular.copy( $scope.attributesAvailable );
		for ( var i=0;i<$scope.attributesAvailable.length ; i++ )
		{
			$scope.bool[i] = true;
		}
	}

	$scope.deSelectAll = function(){
		$scope.set.attributes = [];
		$scope.bool = []
	}

});
