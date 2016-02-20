testApp.controller('conferenceController', function($scope, CONFIG, $routeParams) {
  $scope.config = CONFIG;
  $scope.projectId = $routeParams.projectId;
  console.log($scope.projectId);
});