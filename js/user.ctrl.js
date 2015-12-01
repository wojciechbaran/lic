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
    var data = [{
      name: $scope.currentUser.name,
      surname: $scope.currentUser.surname,
      email: $scope.currentUser.email
    }];
    console.log($scope.currentUser);
    //CUDService.UserUpdate($scope.currentUser, $scope.currentUser.userid, function(response) {
    CUDService.Go('update', data, 'users', $scope.currentUser.id, function(response) {
      if (response.success) {
        $scope.formUD.success = response.message;
      } else {
        $scope.formUD.error = response.message;
      }
      $scope.dataLoading = false;
    });
  };
  $scope.changePassword = function(tab) {
    $scope.formCP.error = '';
    $scope.formCP.success = '';
    $scope.dataLoading = true;
    CUDService.ChangePassword($scope.formCP.dt, $scope.currentUser.userid, function(response) {
      if (response.success) {
        $scope.formCP.success = response.message;
      } else {
        $scope.formCP.error = response.message;
      }
      $scope.dataLoading = false;
    });
  };
});