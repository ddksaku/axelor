var loginModule = angular.module('login', []);
var homeModule = angular.module('home', []);

var app = angular.module('app', ['ionic', 'angular-underscore', 'ngStorage', 'ngCordova', 'ngSanitize',
    'login', 'home'])
    .controller('AppCtrl', function($scope, $location, $ionicHistory, config) {
        $scope.logOut = function() {
            $ionicHistory.clearCache();
            config.user = null;            
            $location.path('login');
        };
    });

app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }

        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

