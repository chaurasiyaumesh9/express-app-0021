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
			controller:'profileCtrl'
		});
		
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

cartApp.controller('loginCtrl', function( $scope, $http, authenticationService, $window, $timeout ){
	$scope.message = "Login With ";
	$scope.showMessage = false;
	/*$scope.closeMessage = function(){
		showMessage = false;
	  }*/
	$scope.login = function( user ){
		//console.log('loginCtrl :',user);;
		
		$http.post('/login', user).then( function( response ){
			
			if ( response.data.user )
			{
				//console.log('login success :',response.data.user );
				var url = "http://" + $window.location.host + "/#/profile";
				$window.location.href = url;
			}else{
				$scope.loginMessage = response.data.message;
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
cartApp.controller('signupCtrl', function( $scope, $http, authenticationService ){
	$scope.message = "signup With ";
	$scope.signUp = function( user ){
		//console.log('signupCtrl :',user);;
		$http.post('/signup', user ).then( function( response ){
			$scope.user = {};
		}, function( errorMessage ){
			console.warn( errorMessage );
		});
	}
});
cartApp.controller('profileCtrl', function( $scope, $http ){
	$scope.message = "User Profile will be shown here ";

	$http.get('/profile').then( function( response ){
		console.log('profile :',response.data);
		$scope.user = response.data;
	}, function( errorMessage ){
		console.warn( errorMessage );
	})
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


