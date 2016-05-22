testApp.directive('ngArticlesfull', function(CONFIG) {
  function link(scope) {

  	if(scope.user){
      //console.log(scope.articlelink);
      var len = CONFIG.fileUploadPath.length+1;
      scope.userId=scope.articlelink.substring(len,len+13);
      //console.log(scope.userId);
    }    
  }
  return {
    restrict: 'A',
    scope: {
      articlelink: '=',
      articlelist: '=',
      user: '@',
      clickable: '@'
    },
    templateUrl: CONFIG.route + '/views/articlesfull.html',
    link: link
  };
});