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

	$rootScope.$watch('activeUser', function(newVal, oldVal) {
		if ( newVal && $rootScope.popup )
		{
			$rootScope.popup.close();
		}
	});

	
	$scope.fbSignUp = function( ){
		$rootScope.popup = $window.open('/auth/facebook', 'Sign in with facebook', 'width=500,height=400');
		var x = $interval( function(){
			$http.get('/loggedin').success( function( user ){
				if ( user !== '0' )
				{
					$rootScope.activeUser = user;
					$location.url('/profile');
					$interval.cancel(x);
				}
			});
		}, 200);
	}
	$scope.googleSignUp = function( ){
		$rootScope.popup = $window.open('/auth/google', 'Sign in with your google account', 'width=500,height=400');
		var x = $interval( function(){
			$http.get('/loggedin').success( function( user ){
				if ( user !== '0' )
				{
					$rootScope.activeUser = user;
					$location.url('/profile');
					$interval.cancel(x);
				}
			});
		}, 200);
	}

	$scope.twitterSignUp = function( ){
		$rootScope.popup = $window.open('/auth/twitter', 'Sign in with your Twitter account', 'width=500,height=400');
		var x = $interval( function(){
			$http.get('/loggedin').success( function( user ){
				if ( user !== '0' )
				{
					$rootScope.activeUser = user;
					$interval.cancel(x);
					$location.url('/profile');
				}
			});
		}, 200);
	}
});