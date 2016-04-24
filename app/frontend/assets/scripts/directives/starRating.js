/*
cartApp.directive('starRating', function () {
    return {
      restrict: 'EA',
		templateUrl:"./templates/star-rating.html",
      scope: {
        ratingValue: '=ngModel',
        max: '=?', // optional (default is 5)
        onRatingSelect: '&?',
        readonly: '=?'
      },
      link: function(scope, element, attributes) {
		  if ( typeof scope.onRatingSelect !== "function" )
		  //if( !scope.onRatingSelect )
		  {
			//console.log('calling undefined');
			scope.onRatingSelect = function( rating ){};
		  }
        if (scope.max == undefined) {
          scope.max = 5;
        }
        function updateStars() {
          scope.stars = [];
          for (var i = 0; i < scope.max; i++) {
            scope.stars.push({
              filled: i < scope.ratingValue
            });
          }
        };
        scope.toggle = function(index) {
          if (scope.readonly == undefined || scope.readonly === false){
            scope.ratingValue = index + 1;
            scope.onRatingSelect({
              rating: index + 1
            });
          }
        };
        scope.$watch('ratingValue', function(oldValue, newValue) {
          if (newValue) {
            updateStars();
          }
        });
      }
    };
  });

  */

 cartApp.directive("starRating", function() {
  return {
    restrict : "EA",
    templateUrl:"./templates/star-rating.html",
    scope : {
      ratingValue : "=ngModel",
      max : "=?", //optional: default is 5
      onRatingSelected : "&?",
      readonly: "=?"
    },
    link : function(scope, elem, attrs) {
		 if ( typeof scope.onRatingSelected !== "function" )
		  {
			scope.onRatingSelected = function( rating ){};
		  }
      if (scope.max == undefined) { scope.max = 5; }
      function updateStars() {
        scope.stars = [];
        for (var i = 0; i < scope.max; i++) {
          scope.stars.push({
            filled : (i < scope.ratingValue.rating)
          });
        }
      };
      scope.toggle = function(index) {
        if (scope.readonly == undefined || scope.readonly == false){
          scope.ratingValue.rating = index + 1;
          scope.onRatingSelected({
            rating: index + 1
          });
        }
      };
      scope.$watch("ratingValue.rating", function(oldVal, newVal) {
        if (newVal) { updateStars(); }
      });
    }
  };  
});

cartApp.directive("averageStarRating", function() {
  return {
    restrict : "EA",
   templateUrl:"./templates/average-star-rating.html",
    scope : {
      averageRatingValue : "=ngModel",
      max : "=?", //optional: default is 5
    },
    link : function(scope, elem, attrs) {
      if (scope.max == undefined) { scope.max = 5; }
      function updateStars() {
        scope.stars = [];
        for (var i = 0; i < scope.max; i++) {
          scope.stars.push({});
        }
        var starContainerMaxWidth = 100; //%
        scope.filledInStarsContainerWidth = scope.averageRatingValue / scope.max * starContainerMaxWidth;
      };
      scope.$watch("averageRatingValue", function(oldVal, newVal) {
        if (newVal) { updateStars(); }
      });
    }
  };
});