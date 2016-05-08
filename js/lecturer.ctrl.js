testApp.controller('lecturerController', function($scope, CONFIG, $rootScope, $location, CUDService) {
  $scope.config = CONFIG;
  $scope.currentUser = $rootScope.currentUser;

  $scope.upgradeUser = function(){
    CUDService.Go('update', $scope.currentUser, 'users', $scope.currentUser.id, function(response) {
      if (response.success) {
        $location.path('/' + CONFIG.route + '/user');
      }
    });
  };
});