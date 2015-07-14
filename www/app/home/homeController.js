homeModule.controller('HomeCtrl', function($scope, $sce, config) {
	$scope.getUrl = function() {
    	return $sce.trustAsResourceUrl(config.url);
  	};  
});