cartApp.controller('profileCtrl', function( $scope, $http, $rootScope ){
	$scope.message = "User Profile will be shown here ";
	$scope.loading = true;
	//console.log('$rootScope :',$rootScope);	
	/*$scope.user = $rootScope.activeUser || {};
	if ( $scope.user )
	{
		$scope.loading = false;
	}*/
	$http.get('/loggedin').success( function( user ){
		if ( user !== '0' )
		{
			$rootScope.activeUser = user;
			$scope.user = user;
			$scope.loading = false;
		}
	});
});