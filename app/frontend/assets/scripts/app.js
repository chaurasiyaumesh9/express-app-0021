var cartApp = angular.module('sampleCartApp', ['ngRoute','ngAnimate']);

cartApp.config(function( $routeProvider, $locationProvider ) {
	$routeProvider
		.when('/', {
			templateUrl : 'views/homepage.html',
			controller:'hompageCtrl'
		})
		.when('/products/:cid', {
			templateUrl : 'views/product-listing.html',
			controller:'productListingCtrl'
		})
		.when('/products/:cid/:pid', {
			templateUrl : 'views/product-details.html',
			controller:'productDetailsCtrl'
		})
		.when('/login', {
			templateUrl : 'views/login.html',
			controller:'loginCtrl'
		})
		.when('/signup', {
			templateUrl : 'views/signup.html',
			controller:'signupCtrl'
		})
		.when('/profile', {
			templateUrl : 'views/profile.html',
			controller:'profileCtrl',
			resolve: { logincheck: checkLogin }
		});
		
});

cartApp.run(getActiveUser);

function checkLogin( $q, $timeout, $http, $location, $rootScope ){
	var deferred = $q.defer();

	$http.get('/loggedin').success( function( user ){
		$rootScope.errorMessage = null;
		if ( user !== '0' )
		{
			$rootScope.activeUser = user;
			deferred.resolve();
		}else{
			$rootScope.errorMessage = 'You need to login first to access this page';
			deferred.reject();
			$location.url('/login');
		}
	});
	return deferred.promise;
}

function getActiveUser( $http, $rootScope ){
	$http.get('/loggedin').success( function( user ){
		if ( user !== '0' )
		{
			$rootScope.activeUser = user;
		}
	});
}

cartApp.controller('loginCtrl', function( $scope, $rootScope, $http, $location, $timeout ){
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
});
cartApp.controller('signupCtrl', function( $scope, $rootScope, $http, $location, $timeout ){
	$scope.message = "signup With ";
	$scope.signUp = function( user ){
		
		$http.post('/signup', user ).then( function( response ){
			console.log('signup response :',response);;
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
cartApp.controller('profileCtrl', function( $scope, $http, $rootScope ){
	$scope.message = "User Profile will be shown here ";
	console.log('$rootScope :',$rootScope);	
	$scope.user = $rootScope.activeUser || {};
});



