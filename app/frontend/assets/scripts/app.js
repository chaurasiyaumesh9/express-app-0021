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
            var isInitialized = false;
            scope.$watch('data', function(newVal, oldVal) {
				 if ( newVal.length > 0 && !isInitialized) {
					 scope.$parent.$on('ngRepeatFinished', function (ngRepeatFinished) {
						$(element).slick( scope.$eval(attrs.slickSlider)).on('afterChange', function(event, slick, currentSlide, nextSlide){
						  scope.$parent.$apply(function() {
								scope.$parent.switchThumbView( currentSlide );
							});
						});;
						isInitialized = true;
					});
                }
            });
        }
    }
});

cartApp.directive('sliderProductView',function( $timeout ){
	return {
		restrict :'A',
		link: function(scope, element, attrs){
			scope.$watch('activeSlide',function(newVal, oldVal){
				console.log(newVal,',', oldVal );
				
				if ( newVal >= 0 )
				{
					/*$timeout(function() {
						$(element).slick('slickGoTo', newVal ).on('afterChange', function(event, slick, currentSlide, nextSlide){
						  scope.$apply(function() {
								scope.switchThumbView( currentSlide );
							});
						});
					},1000);
					*/
					//console.log(jQuery.slick );
					//console.log($(element));
					$(element).slick('slickGoTo', newVal ).on('afterChange', function(event, slick, currentSlide, nextSlide){
					  scope.$apply(function() {
							scope.switchThumbView( currentSlide );
						});
					});
				}
			});
		}
	}
});

