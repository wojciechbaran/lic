testApp.directive('ngAutocomplite', function(CONFIG) {
  function link(scope) {
    scope.items = [{
      placename: 'aaa'
    },{
      placename: 'bbb'
    },{
      placename: 'accaa'
    }];
    // scope.items = function() {
    //   scope.calOn = true;
    // };
    // scope.hideCal = function() {
    //   scope.calOn = false;
    // };
  }
  return {
    restrict: 'A',
    scope: {
      secectItem: '=inp',
      collection: '@coll',
      label: '@label'
    },
    templateUrl: CONFIG.route + '/views/autocomplite.html',
    link: link
  };
});