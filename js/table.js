testApp.directive('ngTab', function(CONFIG) {
return {
	restrict: 'A',
    scope: {
      tableData: '=tab',
      cols: '='
    },
    templateUrl: CONFIG.route + '/views/table.html'
  };
});