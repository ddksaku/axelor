loginModule.factory('LoginFactory', function($http, config) {
    var login = function(url, username, password) {       	 
    	var fullUrl;
        if (url.substr(url.length - 1) == '/') {
            fullUrl = url + config.servicePaths.login;
        } else {
            fullUrl = url + '/' + config.servicePaths.login;
        }
        
        var parameters = JSON.stringify({
            username: username, 
            password: password
        });        

        return $http.post(fullUrl, parameters);        	
    };

    return {
        login: login
    };
})