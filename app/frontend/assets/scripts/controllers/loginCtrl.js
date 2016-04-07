cartApp.controller('loginCtrl', function( $scope, $rootScope, $http, $location, $timeout, $interval, $window ){
	$scope.message = "Login With ";
	$scope.showMessage = false;
	var catchInterval;
	$scope.login = function( user ){
		$http.post('/login', user).then( function( response ){
			//console.log('login response :',response);;
			if ( response.data.user )
			{
				$rootScope.activeUser = response.data.user ;
				$location.url('/profile');
			}else{
				$scope.message = response.data.message;
				$scope.showMessage = true;
				$timeout( function(){
					$scope.showMessage = false;
				},3000)
			}
		}, function( errorMessage ){
			console.warn( errorMessage );
		});
	}
});