cartApp.controller('signupCtrl', function( $scope, $rootScope, $http, $location, $timeout, $interval, $window ){
	$scope.message = "signup With ";
	$scope.signUp = function( user ){
		
		$http.post('/signup', user ).then( function( response ){
			//console.log('signup response :',response);;
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
				//console.log('login failed :',response.data );
			}
		}, function( errorMessage ){
			console.warn( errorMessage );
		});
	}
});