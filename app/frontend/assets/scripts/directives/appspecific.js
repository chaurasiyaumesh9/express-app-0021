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