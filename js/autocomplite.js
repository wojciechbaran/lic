testApp.directive('ngAutocomplite', function(CONFIG) {
  function link(scope) {
  	scope.config=CONFIG;
    scope.listOn = false;
    scope.showList = function() {
      scope.listOn = true;
    };
    scope.hideList = function() {
      scope.listOn = false;
    };
    scope.chosse = function(id,name){
    	scope.to=id;
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