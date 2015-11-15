testApp.controller('userBarController', function($scope, CONFIG, AuthenticationService, $location, $cookies, $rootScope) {
  $scope.config = CONFIG;
  $scope.currentUser = $rootScope.currentUser;

  $scope.logout = function() {
    AuthenticationService.ClearCredentials();
    $location.path('/' + $scope.config.route);
  };
});