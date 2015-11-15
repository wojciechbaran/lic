testApp.controller('mainController', function($scope, CONFIG, $rootScope) {
  $scope.config = CONFIG;
  $scope.tab = 'start';
  $scope.currentUser = $rootScope.currentUser;

  $scope.setTab = function(tab) {
    $scope.tab = tab;
  };
});