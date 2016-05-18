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
      $cookies.remove('currentUser',{'path':'/'+CONFIG.baseURL});
    },
    SetCredentials: function(userData) {
      $rootScope.currentUser = userData;
      var d = new Date();
      d.setHours(d.getHours() + 1);
      $cookies.put('currentUser', JSON.stringify(userData),{'path':'/'+CONFIG.baseURL,expires: d});
    },
    IsLogin: function() {
      if ($rootScope.currentUser) {
        return;
      }
      var userData = $cookies.get('currentUser');
      if (userData) {
        $rootScope.currentUser = JSON.parse(userData);
        return;
      }
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
      }
      var userData = $cookies.get('currentUser');
      if (userData) {
        $rootScope.currentUser = JSON.parse(userData);
        return;
      }
      $location.path('/' + CONFIG.route + '/login');
    },
    AllowAdmin: function() {
      if ($rootScope.currentUser && $rootScope.currentUser.userType == 'admin') {
        return;
      }
      var userData = $cookies.get('currentUser');
      if(userData){
        $rootScope.currentUser = JSON.parse(userData);
      }
      if ($rootScope.currentUser && $rootScope.currentUser.userType == 'admin') {
        return;
      }
      $location.path('/' + CONFIG.route + '/login');
    },
    GeneratePassword: function(callback) {
      var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
      var pass = "";
      for (var x = 0; x < 8; x++) {
          var i = Math.floor(Math.random() * chars.length);
          pass += chars.charAt(i);
      }
      callback(pass);
    }
  };

});