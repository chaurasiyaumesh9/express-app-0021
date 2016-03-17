adminApp.filter('yesNo', function() {
    return function(input) {
        return input ? 'Yes' : 'No';
    }
});

adminApp.filter('removeDeleted', function( ){
	return function( arr ){
		if ( !arr)
		{
			arr = [];
		}
		//console.log('arr :',arr);
		for (var i=0;i<arr.length ;i++ )
		{
			if ( arr[i]['deleted'] )
			{
				arr.splice( i, 1);
			}
		}
		return arr;
	}
});

adminApp.filter('filterProductsByCategory', function( ){
	return function( list, searchCategory ){
		if ( !list )
		{
			return [];
		}
		if ( !searchCategory.name ) //checking if no category then load all
		{
			return list;
		}
		var out = [];
		angular.forEach(list, function( product ){
			angular.forEach( product.categories, function( category ){
				if ( category._id === searchCategory._id && category.selected )
				{
					out.push( product );
				}
			});
		});
		return out;
	  }
});