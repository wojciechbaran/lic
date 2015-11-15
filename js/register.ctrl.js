testApp.controller('registerController', function($scope, CONFIG, AuthenticationService, $location) {
  $scope.config = CONFIG;


  $scope.register = function() {
    $scope.dataLoading = true;
    AuthenticationService.Register($scope.userData, function(response) {
      if (response.success) {
        AuthenticationService.SetCredentials($scope.userData.username, $scope.userData.password, response.userType);
        //$location.path('/' + $scope.config.route + '/user/' + response.userData.id);
        $location.path('/' + $scope.config.route + '/adm');
      } else {
        $scope.userData.error = response.message;
        $scope.dataLoading = false;
      }
    });
  };
});