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

cartApp.controller('hompageCtrl', function( $scope, $http ){
	//console.log('called!');
});

cartApp.service('authenticationService', function( $http, $q){
	return({
		signUp: signUp,
		login: login
	});
	function login( user ){
		var request = $http({
            method: "post",
            url: "/login",
            data: {
                user: user
            }
        });
        return( request.then( handleSuccess, handleError ) );
	}

	function signUp( user ){
		var request = $http({
            method: "post",
            url: "/signup",
            params: {
                action: "add"
            },
            data: user
        });
        return( request.then( handleSuccess, handleError ) );
	}
	function handleError( response ) {
        if ( ! angular.isObject( response.data ) || ! response.data.message ) {
            return( $q.reject( "An unknown error occurred." ) );
        }
        // Otherwise, use expected error message.
        return( $q.reject( response.data.message ) );
    }
    function handleSuccess( response ) {
	    return( response.data );
	}
});

cartApp.controller('loginCtrl', function( $scope, $rootScope, $http, authenticationService, $location, $timeout ){
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
cartApp.controller('signupCtrl', function( $scope, $rootScope, $http, authenticationService, $location, $timeout ){
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
			
			//$scope.user = {};
			//$rootScope.activeUser = response.data.user ;
			//$location.url('/profile');
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

cartApp.directive('onFinishRenderFilters', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }
});

cartApp.directive('slickSlider', function ($timeout) {
    return {
        restrict: 'A',
        scope: {'data': '='},
        link: function (scope, element, attrs) {
            scope.$parent.isInitialized = false;
            scope.$watch('data', function(newVal, oldVal) {
				 if ( newVal.length > 0 && !scope.$parent.isInitialized) {
					 scope.$parent.$on('ngRepeatFinished', function (ngRepeatFinished) {
						 //console.log('finished tr repeat 1');
						$(element).slick( scope.$eval(attrs.slickSlider));
						 scope.$parent.isInitialized = true;
					});
                }
            });
        }
    }
});

cartApp.directive('sliderProductView', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
			//console.log(scope.$eval(attrs.slickSlider));
            scope.$watch('isInitialized',function(newVal, oldVal){
				//console.log(newVal,',', oldVal );
				if ( newVal )
				{
					//console.log('loading dir 2');
					scope.$watch('activeSlide', function( newValueSlide, oldValueSlide ){
						//console.log(newValueSlide,',', oldValueSlide );
						$(element).slick('slickGoTo', newValueSlide ).on('afterChange', function(event, slick, currentSlide, nextSlide){
							//console.log('got it 1 !', currentSlide);
							scope.$apply(function() {
								scope.switchThumbView( currentSlide );
							});
						});;;;
					});
				}
			});
        }
    }
});

cartApp.directive('autoSlideThumb', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch('isInitialized',function(newVal, oldVal){
				if ( newVal )
				{
					//console.log('loading dir 2');
					scope.$watch('activeSlide', function( newValueSlide, oldValueSlide ){
						//console.log(newValueSlide,',', oldValueSlide );
						$(element).slick('slickGoTo', newValueSlide );
					});
				}
			});
        }
    }
});


