testApp.directive('ngUserfullname', function(CONFIG,SearchService) {
  function link(scope) {
    console.log(scope.userid);
    scope.userid
  	SearchService.search('simple', 'id:'+scope.userid, 'users', 'id:ASC', function(response) {
      scope.users = response[0];
      console.log(response);      
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