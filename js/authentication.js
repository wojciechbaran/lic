angular.module('testApp').service('AuthenticationService', function($http, CONFIG, $rootScope, $cookies, $location) {

  return {
    Login: function(username, password, callback) {
      var req = {
        type: 'login',
        data: {
          username: username,
          password: password
        }
      }
      $http.post(CONFIG.baseURL + '/' + CONFIG.route + '/backend/authentication.php', req)
        .success(function(response, status) {
          callback(response);
        })
        .error(function(response, status) {
          console.log('error');
        });
    },
    ClearCredentials: function() {
      $rootScope.currentUser = {};
      $cookies.remove('currentUser');
    },
    SetCredentials: function(userData) {
      $rootScope.currentUser = userData;
      $cookies.putObject('currentUser', $rootScope.currentUser);

    },
    Register: function(userData, callback) {
      $http.post(CONFIG.baseURL + '/' + CONFIG.route + '/backend/authentication.php', userData)
        .success(function(response, status) {
          callback(response);
        })
        .error(function(response, status) {
          console.log('error');
        });
    },
    Allow: function() {
      if ($rootScope.currentUser) {
        return;
      } else {
        var userData = $cookies.get('currentUser');
        if (userData) {
          $rootScope.currentUser = userData;
          return;
        }
        $location.path('/' + CONFIG.route + '/login');
      }
    }
  };

});