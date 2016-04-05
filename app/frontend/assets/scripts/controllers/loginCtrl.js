cartApp.controller('loginCtrl', function( $scope, $rootScope, $http, $location, $timeout, $interval, $window ){
	$scope.message = "Login With ";
	$scope.showMessage = false;
	$scope.login = function( user ){
		$http.post('/login', user).then( function( response ){
			console.log('login response :',response);;
			if ( response.data.user )
			{
				$rootScope.activeUser = response.data.user ;
				$location.url('/');
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

	$rootScope.$watch('activeUser', function(newVal, oldVal) {
		if ( newVal && $rootScope.popup )
		{
			$rootScope.popup.close();
		}
	});

	
	$scope.fbLogin = function( ){
		$rootScope.popup = $window.open('/auth/facebook', 'Sign in with facebook', 'width=500,height=400');
		var x = $interval( function(){
			$http.get('/loggedin').success( function( user ){
				if ( user !== '0' )
				{
					$rootScope.activeUser = user;
					$location.url('/');
					$interval.cancel(x);
				}
			});
		}, 200);
	}
	$scope.googleLogin = function( ){
		$rootScope.popup = $window.open('/auth/google', 'Sign in with your google account', 'width=500,height=400');
		var x = $interval( function(){
			$http.get('/loggedin').success( function( user ){
				if ( user !== '0' )
				{
					$rootScope.activeUser = user;
					$location.url('/');
					$interval.cancel(x);
				}
			});
		}, 200);
	}
});