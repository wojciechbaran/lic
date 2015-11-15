testApp.controller('loginController', function($scope, CONFIG, AuthenticationService, $location) {
  $scope.config = CONFIG;

  (function initController() {
    // reset login status
    AuthenticationService.ClearCredentials();
  })();

  $scope.login = function() {
    $scope.dataLoading = true;
    AuthenticationService.Login($scope.userData.username, $scope.userData.password, function(response) {
      if (response.success) {
        AuthenticationService.SetCredentials(response.userData);
        if(response.userData.userType=='admin'){
          $location.path('/' + $scope.config.route + '/adm');
        }
        $location.path('/' + $scope.config.route + '/user');
      } else {
        $scope.userData.error = response.message;
        $scope.dataLoading = false;
      }
    });
  };
});