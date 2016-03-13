adminApp.controller('productsCtrl', function($scope,$rootScope, $routeParams, productService, categoryService, $timeout, common,Upload){
	$scope.message = "Manage Your Products";
	$scope.addSuccess = false, $scope.updateSuccess = false;
	$scope.currentPage = 1;
	$scope.pageSize = 10;

	$scope.showDelete = false;
	$scope.deletionSuccess = false;
	$scope.deleteCount = 0;

	$scope.sortType     = 'name'; // set the default sort type
	$scope.sortReverse  = false;  // set the default sort order
	
	$scope.loadDefaults = function(){
		$scope.product = { in_stock: false, categories:[] };
	}
	$scope.getProductCategories = getProductCategories; //providing access to scope view
	$scope.pageChangeHandler = function(num) {};
	getAllCategories();
	$scope.loadDefaults();

	if ( $routeParams.id )
	{
		productID = $routeParams.id; // check if in edit/view mode
		productService.getProductById( productID ).then( function( response ){
			$scope.product = response;
			$scope.product.valid_from = common.stringToDate( $scope.product.valid_from );
			$scope.product.valid_till  = common.stringToDate( $scope.product.valid_till );
		} , function(errorMessage ){ 
			console.warn( errorMessage );
		});
	}
	
	$scope.addNewProduct = function( product ){	
		productService.addNewProduct( product ).then( function( response ){
			$scope.addSuccess = true;			
			$timeout(function() { $scope.addSuccess = false;}, 3000); //need to make it generic for all the messages
			$scope.loadDefaults(); //re-initalize my page by loading defaults
			$scope.getProductCategories(); //re-initalize all the empty categories
		}, function( errorMessage ){
			console.warn( errorMessage );
		});
	}

	$scope.updateProduct = function( product ){
		product.updated_at = new Date();
		productService.updateProduct( product ).then( function( response ){
			$scope.updateSuccess = true;
			$timeout(function() { $scope.updateSuccess = false;}, 3000); //need to make it generic for all the messages
		}, function( errorMessage ){
			console.warn( errorMessage );
		});
	}

	$scope.deleteProduct = function( product ){
		productService.deleteProduct( product._id ).then( function( response ){
			$scope.deletionSuccess = true;
			$timeout(function() { $scope.deletionSuccess = false;}, 3000); //need to make it generic for all the messages
		}, function( errorMessage ){
			console.warn( errorMessage );
		});
	}

	$scope.revertAddingProduct = function( product ){
		console.log('revertAddingProduct :', product);
	}
	getProductList();

	function getProductList(){
		$scope.loading = true;
		productService.getProductList().then( function( response ){
			$scope.productList = response;
			$scope.loading = false;
		}, function( errorMessage ){
			console.warn( errorMessage );
		});
	}

	function getProductCategories(){
		categoryService.getAllCategories().then( function( response ){
			$scope.product.categories = response;
		}, function( errorMessage ){
			console.warn( errorMessage );
		});
	}

	function getAllCategories(){
		categoryService.getAllCategories().then( function( response ){
			$scope.categories = response;
		}, function( errorMessage ){
			console.warn( errorMessage );
		});
	}

	$scope.removeProductImage = function( image ){
		var pos = $scope.product['images'].indexOf( image );
		if ( pos != -1 )
		{
			$scope.product['images'].splice( pos, 1);
		}
		//console.log( pos );
	}

	$scope.uploadFiles = function( product ){
		product['images'] = product['images'] || [];
		for ( var i=0; i<product['temp'].length ;i++ )
		{
			var file = product['temp'][i];
			Upload.upload({
				url: "/admin/uploads",
                data: {productPic: file}
            }).then(function (response) {
				product['images'].push( response.data['image'] );
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });;
		}
	}

	$scope.showFiles = function(files, errFiles) {
        $scope.product.temp = files;
		console.log('$scope.product.temp :',$scope.product.temp);
        $scope.product.invalidImages =  errFiles;
    }
	$scope.deleteProducts = function(){
		var checked = getCheckedProducts();
		
		for ( var i=0; i<checked.length ;i++ )
		{ 
			productService.deleteProduct( checked[i]._id ).then( function( response ){
				getProductList();
				$scope.deleteCount++;
			}, function( errorMessage ){
				console.warn( errorMessage );
			});
		}
		$scope.deletionSuccess = true;
	}

	 $scope.checkAll = function () {
		angular.forEach($scope.productList, function ( product ) {
			product.selected = $scope.selectAll;
		});
		 toggleDeleteButton();
	};

	 $scope.checkIndividual = function ( ) {
		 if ( getCheckedProducts().length < $scope.productList.length )
		 {
			$scope.selectAll = false;
		 }
		toggleDeleteButton();		
	};
	function toggleDeleteButton(){
		if ( getCheckedProducts().length >0 )
		 {
			$scope.showDelete = true;
		 }else{
			$scope.showDelete = false;
		 }
	}

	function getCheckedProducts(){
		var arr = [];
		for (var i=0; i<$scope.productList.length ;i++ )
		{
			if ( $scope.productList[i].selected )
			{
				arr.push( $scope.productList[i] );
			}	
		}
		return arr;
	}

	$scope.loadCategoryProducts = function( category ){
		$scope.currentCategory = category;
		//console.log('$scope.productsCategory :',$scope.currentCategory);
	}

});