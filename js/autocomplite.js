testApp.directive('ngAutocomplite', function(CONFIG, CUDService) {
  function link(scope) {
  	scope.config=CONFIG;
    scope.listOn = false;
    scope.showList = function() {
      scope.listOn = true;
    };
    scope.hideList = function() {
      scope.listOn = false;
    };
    scope.chosseArticle = function(link, name){
    	scope.to=link;
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
    templateUrl: CONFIG.route + '/views/autocomplite.html',
    link: link
  };
});