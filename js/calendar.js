testApp.directive('ngCalendar', function(CONFIG, CUDService) {
  function link(scope) {
    scope.show = function() {
      console.log(scope.field);
      console.log(scope.val);
    };
  }
  return {
    restrict: 'A',
    scope: {
      field: '=',
      val: '='
    },
    templateUrl: CONFIG.route + '/views/calendar.html',
    link: link
  };
});