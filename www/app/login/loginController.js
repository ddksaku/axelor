loginModule.controller('LoginCtrl', function($scope, $log, $location, $ionicLoading, $cordovaToast, $localStorage, config, LoginFactory) {
	var moduleName = 'LoginCtrl';
	
	if (_.isUndefined($localStorage.url)) {
		$localStorage.url = 'http://';
	}

	$scope.model = {
		url: $localStorage.url,
		username: $localStorage.username,
		password: $localStorage.password
	};

	$scope.login = function(isValid) {			
		var functionName = 'login';

		$scope.submitted = true;		

		if (isValid) {
			$ionicLoading.show({template: 'Logging in...'});

			var username = $scope.model.username;			
			var password = $scope.model.password;
			var	url = $scope.model.url;					
					
			$localStorage.username = username;
			$localStorage.password = password;
			$localStorage.url = url;

			LoginFactory.login(url, username, password)
				.success(function(data) {					
					$ionicLoading.hide();															
					config.url = url;
					$location.path('/home');																		                
	            })
	            .error(function(error) {	            	
	            	$ionicLoading.hide();		            	
	            	$cordovaToast.showLongBottom('Invalid user name or password.');	                
	            });               

		}
    };    
});