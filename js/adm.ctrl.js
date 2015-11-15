testApp.controller('admController', function($scope, CONFIG, Search, AuthenticationService) {
  $scope.config = CONFIG;

  AuthenticationService.Allow();

  // $scope.search = function() {
  //   Search.search($scope.ww, 'ttt', function(response) {
  //   	$scope.response = response;
  //   	console.log($scope.response);
  //   });
  // }
});