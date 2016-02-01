testApp.controller('projectController', function($scope, CONFIG, SearchService, AuthenticationService, CUDService) {

  $scope.projectDescS = function() {
      $scope.projectDesc.error = '';
      $scope.projectDesc.success = '';
      //$scope.dataLoading = true;
      var data = {
        name: $scope.projectDesc.dtitle,
        description: $scope.projectDesc.contractordescription
      }
      // CUDService.Go('add', data, 'projects', 'name', function(response) {
      //   if (response.success) {
      //     $scope.editProject(response.newid);
      //   } else {
      //     $scope.newProject.error = response.message;
      //   }
      //   $scope.dataLoading = false;
      // });
    console.log(data);
  };
});