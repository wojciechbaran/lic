testApp.controller('admController', function($scope, CONFIG, Search, AuthenticationService, CUDService) {
  $scope.config = CONFIG;
  $scope.tab = 'start';
  AuthenticationService.AllowAdmin();

  $scope.setTab = function(tab) {
    $scope.tab = tab;
  };
  $scope.newProjectS = function(){
  	$scope.newProject.error = '';
    $scope.newProject.success = '';
    $scope.dataLoading = true;
    CUDService.Go('add', $scope.newProject.projectName, 'projects', 1, function(response) {
      if (response.success) {
        $scope.newProject.success = response.message;
      } else {
        $scope.newProject.error = response.message;
      }
      $scope.dataLoading = false;
    });
  };
  // $scope.search = function() {
  //   Search.search($scope.ww, 'ttt', function(response) {
  //   	$scope.response = response;
  //   	console.log($scope.response);
  //   });
  // }
});