testApp.controller('startController', function($scope, CONFIG, SearchService) {
  var query = {$or: [{projectStatus:1},{projectStatus:2}]};
  SearchService.search('advenced', query, 'projects', '', function(response) {
  	$scope.newProjects = response;
  });
  query = {$or: [{projectStatus:3},{projectStatus:4}]};
  SearchService.search('advenced', query, 'projects', '', function(response) {
  	$scope.oldProjects = response;
  });
});