adminApp.controller('attributeSetsCtrl', function($scope, $http, $routeParams, attributeService, $timeout ){
	$scope.message = "Make New Attribute Set";
	getAllAttributes();


	function getAllAttributes(){
		attributeService.getAllAttributes().then( function( response ){
			$scope.attributes = response;
		}, function( errorMessage ){
			console.warn( errorMessage );
		});
	}
});