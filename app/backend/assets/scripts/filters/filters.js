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