app.config(function($stateProvider, $httpProvider, $urlRouterProvider, $provide) {
    $provide.decorator('$log', ['$delegate', function ($delegate) {
        var origLog = $delegate.log;
        var origInfo = $delegate.info;
        var origError = $delegate.error;
        var origWarn = $delegate.warn;
        var origDebug = $delegate.debug;
                
        $delegate.log = function () {
            var args = [].slice.call(arguments);
            var log = [args.join(' - ')];
            
            // Send on our enhanced message to the original debug method.
            origLog.apply(null, log)
        };

        $delegate.info = function () {
            var args = [].slice.call(arguments);
            var log = [args.join(' - ')];
            
            // Send on our enhanced message to the original debug method.
            origInfo.apply(null, log)
        };

        $delegate.error = function () {
            var args = [].slice.call(arguments);
            var log = [args.join(' - ')];
            
            // Send on our enhanced message to the original debug method.
            origError.apply(null, log)
        };

        $delegate.warn = function () {
            var args = [].slice.call(arguments);
            var log = [args.join(' - ')];
            
            // Send on our enhanced message to the original debug method.
            origWarn.apply(null, log)
        };

        $delegate.debug = function () {
            var args = [].slice.call(arguments);
            var log = [args.join(' - ')];
            
            // Send on our enhanced message to the original debug method.
            origDebug.apply(null, log)
        };

        return $delegate;
    }]);

    // We need to setup some parameters for http requests
    // These three lines are all you need for CORS support
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = false;
    // delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    
    // to fix an issue that $http.post does not pass parameters to $_REQUEST
    // $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
    // $httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
    $httpProvider.interceptors.push(['$q', function($q) {
        return {
            request: function(config) {
                if (config.data && typeof config.data === 'object') {
                    config.data = $.param(config.data);
                }
                return config || $q.when(config);
            }
        };
    }]);            

    $stateProvider

    .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl'    
    })

    .state('home', {
        url: '/home',
        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl'                    
    });    
  
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
});