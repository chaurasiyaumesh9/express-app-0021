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
				 if ( newVal.length > 0 && !isInitialized) {
					$timeout(function() {
						$(element).slick( scope.$eval(attrs.slickSlider));
						isInitialized = true;
					},0);
                    
                }
            });
        }
    }
});



cartApp.directive('sliderProductView',function(){
	return {
		restrict :'A',
		link: function(scope, element, attrs){
			scope.$watch('currentSlide',function(newVal, oldVal){
				console.log(newVal,',', oldVal );
				if ( !newVal)
				{
					//newVal = 0;
				}
				if ( newVal >= 0 )
				{
					$(element).slick('slickGoTo', newVal, true ).on('afterChange', function(event, slick, currentSlide, nextSlide){
					  scope.$apply(function() {
							scope.switchThumbView( currentSlide );
						});
					});
				}
			});
		}
	}
});

