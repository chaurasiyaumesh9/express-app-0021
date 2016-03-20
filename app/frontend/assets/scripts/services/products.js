cartApp.service('productService', function($http, $q){
	return({
		getProductsByCategory: getProductsByCategory,
		getProductById: getProductById,
		getAllProducts: getAllProducts
	});

	function getAllProducts(){
		var request = $http({
            method: "get",
            url: "/products",
            params: {
                action: "get"
            }
        });
        return( request.then( handleSuccess, handleError ) );
	}
	function getProductById( pid ){
		//console.log('getProductById:',pid);
		var request = $http({
            method: "get",
            url: "/product/" + pid,
            params: {
                action: "get"
            }
        });
        return( request.then( handleSuccess, handleError ) );
	}
	
	function getProductsByCategory( cid ){
		//console.log('getProductsByCategory:',cid);
		var request = $http({
            method: "get",
            url: "/products/" + cid,
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