testApp.controller('userController', function($scope, CONFIG, AuthenticationService, CUDService, $location, $rootScope, $cookies) {
  $scope.config = CONFIG;
  $scope.tab = 'start';
  AuthenticationService.Allow();
  $scope.currentUser = $rootScope.currentUser;

  $scope.setTab = function(tab) {
    $scope.tab = tab;
  };
  $scope.changeUserData = function() {
    $scope.formUD.error = '';
    $scope.formUD.success = '';
    $scope.dataLoading = true;
    CUDService.UserUpdate($scope.currentUser, $scope.currentUser.userid, function(response) {
      if (response.success) {
        $scope.formUD.success = response.message;
      } else {
        $scope.formUD.error = response.message;
      }
      $scope.dataLoading = false;
    });
  };
});