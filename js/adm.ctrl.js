testApp.controller('admController', function($scope, CONFIG, SearchService, AuthenticationService, CUDService) {
  $scope.config = CONFIG;
  $scope.tab = 'start';
  AuthenticationService.AllowAdmin();

  $scope.listProjectCols = [{
    name: 'name',
    label: 'Nazwa'
  }, {
    name: 'startDate',
    label: 'Data rozpoczęcia'

  }];
  $scope.setTab = function(tab) {
    $scope.tab = tab;
  };
  $scope.newProjectS = function() {
    $scope.newProject.error = '';
    $scope.newProject.success = '';
    $scope.dataLoading = true;
    var data = {
      name: $scope.newProject.projectName
    }
    CUDService.Go('add', data, 'projects', 'name', function(response) {
      if (response.success) {
        $scope.tab = 'listProject';
        $scope.listProjectS();
      } else {
        $scope.newProject.error = response.message;
      }
      $scope.dataLoading = false;
    });
  };
  $scope.listProjectS = function() {
    // type, condition, table, order
    SearchService.search('simple', '', 'projects', 'id ASC', function(response) {
      $scope.listProject = response;
    });
  };
  $scope.init = function() {
    $scope.listProjectS();
  };
  $scope.init();
});