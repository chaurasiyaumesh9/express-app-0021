cartApp.service('categoryService', function($http, $q){
	return({
		getActiveCategories: getActiveCategories,
		getCategoryById: getCategoryById
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
	function getCategoryById( id ) {
        var request = $http({
            method: "get",
            url: "/categories/" + id,
            params: {
                action: "get"
            },
            data: {
                id: id
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
