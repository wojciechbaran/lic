testApp.controller('userController', function($scope, CONFIG, AuthenticationService, $location, $rootScope) {
  $scope.config = CONFIG;
  AuthenticationService.Allow();
  $scope.currentUser = $rootScope.currentUser;

});