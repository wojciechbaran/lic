testApp.directive('ngTab', function(CONFIG) {
  function link(scope) {
    scope.sortVal = '$index';
    scope.sortOrder = true;
    scope.setSort = function(val) {
      scope.sortVal = val;
    };

  }
  return {
    restrict: 'A',
    // transclude: true,
    scope: {
      tableData: '=tab',
      cols: '='
    },
    templateUrl: CONFIG.route + '/views/table.html',
    link: link
  };
});