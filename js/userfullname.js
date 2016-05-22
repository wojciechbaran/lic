testApp.directive('ngUserfullname', function(CONFIG,SearchService) {
  function link(scope) {
  	SearchService.search('simple', 'id:'+scope.userid, 'users', 'id:ASC', function(response) {
      scope.users = response[0];      
    });    
  }
  return {
    restrict: 'A',
    scope: {
      userid: '=',   
    },
    templateUrl: CONFIG.route + '/views/userfullname.html',
    link: link
  };
});