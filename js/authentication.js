angular.module('testApp').service('AuthenticationService', function($http, CONFIG, $rootScope, $cookieStore, $location) {

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
      $rootScope.globals = {};
      $cookieStore.remove('globals');
    },
    SetCredentials: function(username, password, userType) {
      $rootScope.globals = {
        currentUser: {
          username: username,
          //authdata: authdata,
          userType: userType
        }
      };
      $cookieStore.put('globals', $rootScope.globals);
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
      if($rootScope.globals && $rootScope.globals.currentUser && $rootScope.globals.currentUser.username){
        return;
      }else{
        $location.path('/' + CONFIG.route + '/login');        
      }
    }
  };

});