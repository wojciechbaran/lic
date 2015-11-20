testApp.directive('ngTab', function(CONFIG) {
  function link(scope) {
    scope.sortVal = '$index';
    scope.sortOrder = false;
    scope.setSort = function(val) {
      if (scope.sortVal == val) {
        scope.sortOrder ? scope.sortOrder = false : scope.sortOrder = true;
      } else {
        scope.sortVal = val;
        scope.sortOrder = false;
      }

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