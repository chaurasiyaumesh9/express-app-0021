adminApp.directive('category', function(){
	// a directive to add new category OR edit/show existing category
	// show or collect category data 
	return {
		restrict: "EA",
		replace: true,
		templateUrl:"./templates/category.html"
	}
});