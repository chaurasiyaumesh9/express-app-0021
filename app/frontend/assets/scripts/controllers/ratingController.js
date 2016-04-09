cartApp.controller('ratingController', function( $scope, $http, $location, $rootScope, categoryService ){
	this.rating1 = 5;
    this.rating2 = 1;
    this.isReadonly = true;
    this.rateFunction = function(rating) {
     // console.log('Rating selected: ' + rating);
    };
	
});
