testApp.controller('conferenceController', function($scope, CONFIG, $routeParams, $rootScope, SearchService) {
  $scope.config = CONFIG;
  $scope.id = $routeParams.projectId;
  $scope.currentUser = $rootScope.currentUser;
  SearchService.search('simple', 'id:' + $scope.id, 'projects', '', function(response) {
  	$scope.singleProject = response;
  });
});