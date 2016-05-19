testApp.directive('ngAutocompliteArticles', function(CONFIG, CUDService) {
  function link(scope) {
  	scope.config=CONFIG;
    scope.listOn = false;
    scope.showList = function() {
      scope.listOn = true;
    };
    scope.hideList = function() {
      scope.listOn = false;
    };
    scope.chosseArticle = function(linki, name){
    	scope.to=linki;
    	scope.show=name;
    	scope.listOn = false;
    };
    
  }
  return {
    restrict: 'A',
    scope: {
      from: '=',
      to: '=',
      show: '=',      
    },
    templateUrl: CONFIG.route + '/views/autocompliteArticles.html',
    link: link
  };
});