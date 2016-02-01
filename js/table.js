testApp.directive('ngTab', function(CONFIG) {
  function link(scope) {
    //sort
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
    //pagination
    scope.setPage = function(page) {
      if (page < 0) {
        page = 0;
      }
      if (page > scope.lastPage) {
        page = scope.lastPage;
      }
      scope.currentPage = page;
    }
    scope.checkPage = function(g) {
      if (scope.tableData && scope.tableData.length < g) {
        g = g - (scope.limit - (scope.tableData.length % scope.limit));
      }
      return g;
    }
    scope.pagination = function() {
      if (scope.tableData && scope.tableData.length) {
        scope.empty = false;
      } else {
        scope.empty = true;
      }

      scope.limit ? true : scope.limit = 10;
      scope.firstPage = 0;
      scope.currentPage = 0;
      if (scope.tableData) {
        scope.numberPage = Math.ceil(scope.tableData.length / scope.limit);
        scope.lastPage = scope.numberPage - 1;
      } else {
        scope.lastPage = 0;
        scope.numberPage = 1;
      }
    };
    scope.getNumber = function(num) {
      if (num > 0) {
        return new Array(num);
      }
      return new Array(1);
    };
    scope.setNumbers = function(num){
    	scope.limit = num;
    	scope.pagination();
    }
    scope.$watch('tableData', scope.pagination);

  }
  return {
    restrict: 'A',
    //transclude: true,
    scope: {
      tableData: '=tab',
      cols: '=',
      limit: '=',
      editfunction: '&callbackFn'
    },
    templateUrl: CONFIG.route + '/views/table.html',
    link: link
  };
});