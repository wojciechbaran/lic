testApp.controller('admController', function($scope, CONFIG, Search, AuthenticationService) {
  $scope.config = CONFIG;
  $scope.tab = 'start';
  AuthenticationService.AllowAdmin();

  $scope.setTab = function(tab) {
    $scope.tab = tab;
  };
  // $scope.search = function() {
  //   Search.search($scope.ww, 'ttt', function(response) {
  //   	$scope.response = response;
  //   	console.log($scope.response);
  //   });
  // }
});