testApp.directive('ngPlan', function(CONFIG,SearchService) {
  function link(scope) {
    scope.block=JSON.parse(scope.blockstr);    
  }
  return {
    restrict: 'A',
    scope: {
      blockstr: '@'
    },
    templateUrl: CONFIG.route + '/views/plan.html',
    link: link
  };
});