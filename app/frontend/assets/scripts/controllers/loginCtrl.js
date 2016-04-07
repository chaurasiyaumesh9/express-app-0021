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

	$rootScope.$watch('activeUser', function(newVal, oldVal) {
		//console.log('newVal : ',newVal, ',oldVal : ',oldVal)
		if ( newVal && $rootScope.popup )
		{
			$rootScope.popup.close();
		}
	});

	/* $rootScope.$on('popupWindowOpened', function(event, data) { 
		console.log('popupWindowOpened'); 
	});
	$rootScope.$on('popupWindowClosed', function(event, data) { console.log('popupWindowClosed'); }); */

	function onSuceessCallback( user ){
		if ( user !== '0' )
		{
			$rootScope.activeUser = user;
			$scope.disablePopup = false;
			$interval.cancel( catchInterval );
			$location.url('/profile');
		}
	}
	
	$scope.fbLogin = function( ){
		$rootScope.popup = $window.open('/auth/facebook', 'Sign in with facebook', 'width=500,height=400');
		//$rootScope.$emit('popupWindowOpened');
		$scope.disablePopup = true;
		catchInterval = $interval( function(){
			if ( $rootScope.popup.closed && !$rootScope.activeUser )
			{
				$scope.disablePopup = false;
			}
			$http.get('/loggedin').success( onSuceessCallback );
		}, 200);
	}
	$scope.googleLogin = function( ){
		$rootScope.popup = $window.open('/auth/google', 'Sign in with your google account', 'width=500,height=400');
		$scope.disablePopup = true;
		catchInterval = $interval( function(){
			if ( $rootScope.popup.closed && !$rootScope.activeUser )
			{
				$scope.disablePopup = false;
			}
			$http.get('/loggedin').success( onSuceessCallback );
		}, 200);
	}

	

	$scope.twitterLogin = function( ){
		$rootScope.popup = $window.open('/auth/twitter', 'Sign in with your Twitter account', 'width=500,height=400');
		$scope.disablePopup = true;
		catchInterval = $interval( function(){
			if ( $rootScope.popup.closed && !$rootScope.activeUser )
			{
				$scope.disablePopup = false;
			}
			$http.get('/loggedin').success( onSuceessCallback );
		}, 200);
	}

	
});