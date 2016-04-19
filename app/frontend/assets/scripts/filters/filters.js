cartApp.filter('yesNo', function() {
    return function(input) {
        return input ? 'Yes' : 'No';
    }
});

cartApp.filter('smallImg', function( ){
	return function( arr ){
		for (var i=0;i<arr.length ;i++ )
		{
			//console.log('arr :',arr[i]);
			if ( arr[i].role['small'])
			{
				return arr[i]['url'];
			}
		}
	}
});

cartApp.filter('filterProductsByCategory', function( ){
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


