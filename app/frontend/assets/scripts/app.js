var cartApp = angular.module('sampleCartApp', ['ngRoute']);

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
		});
		
});

cartApp.directive('slickSlider', function ($timeout) {
    return {
        restrict: 'A',
        scope: {'data': '='},
        link: function (scope, element, attrs) {
            var isInitialized = false;
            scope.$watch('data', function(newVal, oldVal) {
				//console.log('newVal :',newVal);
				//console.log('oldVal :',oldVal	);
                if ( newVal.length > 0 && !isInitialized) {
					//console.log('true',scope.$eval(attrs.slickSlider));
					$timeout(function() {
						$(element).slick( scope.$eval(attrs.slickSlider));
						isInitialized = true;
					},0);
                    
                }
            });
        }
    }
});

/*
cartApp.directive('slickSlider',function($timeout){
 return {
   restrict: 'A',
   link: function(scope,element,attrs) {
     $timeout(function() {
         $(element).slick(scope.$eval(attrs.slickSlider));
     });
   }
 }
}); */