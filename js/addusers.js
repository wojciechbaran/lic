testApp.directive('ngAddusers', function(CONFIG) {
  function link(scope) {
    scope.add='';
    scope.$watch(function(){
    	if(scope.add!=''){
	      scope.to.push(scope.add);
	      scope.add='';
	    }
    });
    scope.remove = function(id){
    	var index = scope.to.indexOf(id);
    	if (index > -1) {
		    scope.to.splice(index, 1);
		}
    }
  }
  return {
    restrict: 'A',
    scope: {
      userslist: '=',
      to: '=',
      label: '@'   
    },
    templateUrl: CONFIG.route + '/views/addusers.html',
    link: link
  };
});