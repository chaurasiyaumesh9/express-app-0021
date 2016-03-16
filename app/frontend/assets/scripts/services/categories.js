cartApp.service('categoryService', function($http, $q){
	return({
		getActiveCategories: getActiveCategories
	});

	function getActiveCategories(){
		var request = $http({
            method: "get",
            url: "/categories",
            params: {
                action: "get"
            }
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
