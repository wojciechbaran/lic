testApp.controller('startController', function($scope, CONFIG, SearchService) {
  var query = {projectStatus:0 };
  SearchService.search('advenced', query, 'projects', '', function(response) {
    console.log(response);
  });
  
});