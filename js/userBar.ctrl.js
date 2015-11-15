testApp.controller('userBarController', function($scope, CONFIG, $rootScope, AuthenticationService, $location) {
  $scope.config = CONFIG;
  $scope.currentUser = $rootScope.currentUser;

  $scope.logout = function() {
    AuthenticationService.ClearCredentials();
    $location.path('/' + $scope.config.route);
  };
});