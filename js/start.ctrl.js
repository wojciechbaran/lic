testApp.controller('startController', function($scope, CONFIG, SearchService) {
  $scope.newProjectsC = false;
  $scope.oldProjectsC = false;
  var query = {$or: [{projectStatus:1},{projectStatus:2}]};
  SearchService.search('advenced', query, 'projects', '', function(response) {
  	$scope.newProjects = response;
  	if($scope.newProjects && Object.prototype.toString.call( $scope.newProjects ) === '[object Array]'){
  		$scope.newProjectsC=true;
  	}
  });
  query = {$or: [{projectStatus:3},{projectStatus:4}]};
  SearchService.search('advenced', query, 'projects', '', function(response) {
  	$scope.oldProjects = response;
  	if($scope.oldProjects && Object.prototype.toString.call( $scope.oldProjects ) === '[object Array]'){
	  	$scope.oldProjectsC=true;
	  }
  });
});