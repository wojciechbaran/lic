testApp.controller('userController', function($scope, CONFIG, AuthenticationService, CUDService, $location, $rootScope, $cookies,SearchService) {
  $scope.config = CONFIG;
  $scope.tab = 'start';
  AuthenticationService.Allow();
  $scope.currentUser = $rootScope.currentUser;
  var query = {$or: [{projectStatus:1},{projectStatus:2}]};
  SearchService.search('advenced', query, 'projects', '', function(response) {
    $scope.newProjects = response;
  });
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
    CUDService.ChangePassword($scope.formCP.dt, $scope.currentUser.id, function(response) {
      if (response.success) {
        $scope.formCP.success = response.message;
      } else {
        $scope.formCP.error = response.message;
      }
      $scope.dataLoading = false;
    });
  };
});