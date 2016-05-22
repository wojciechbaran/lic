testApp.directive('ngArticlesfull', function(CONFIG,SearchService) {
  function link(scope) {
    scope.config = CONFIG;
    scope.title={};
    if(scope.cilckable){
      scope.cilckablelink=scope.config.route+'/'+scope.articlelink;
    }
    var len = CONFIG.fileUploadPath.length+1;
    scope.userId=scope.articlelink.substring(len,len+13);
    SearchService.search('simple', 'id:'+scope.userId, 'users', 'id:ASC', function(response) {
      scope.articles = response[0].articles;
      for(var i = 0; i < scope.articles.length; i++){
        if(scope.articles[i].file.link == scope.articlelink){
          scope.title=scope.articles[i].title;
        }
      }
      console.log(scope.title); 
    });    
  }
  return {
    restrict: 'A',
    scope: {
      articlelink: '=',
      articlelist: '=',
      user: '@',
      cilckable: '@'
    },
    templateUrl: CONFIG.route + '/views/articlesfull.html',
    link: link
  };
});