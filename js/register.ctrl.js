testApp.controller('registerController', function($scope, CONFIG, AuthenticationService, $location) {
  $scope.config = CONFIG;


  $scope.register = function() {
    $scope.dataLoading = true;
    AuthenticationService.Register($scope.userData, function(response) {
      if (response.success) {
        $location.path('/' + $scope.config.route + '/login');
      } else {
        $scope.userData.error = response.message;
        $scope.dataLoading = false;
      }
    });
  };
});