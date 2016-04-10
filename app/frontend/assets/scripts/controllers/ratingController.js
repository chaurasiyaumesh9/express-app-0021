cartApp.controller('ratingController', function( $scope ){
	this.rating1 = 5;
    this.rating2 = 1;
	this.averageRating = 2;
    this.isReadonly = true;
    this.rateFunction = function(rating) {
      //console.log('Rating selected: ' + rating);
    };
	
});
