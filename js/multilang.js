testApp.directive('ngMultilang', function(CONFIG) {
  function link(scope) {
    scope.languages = CONFIG.languages;
    scope.tab = CONFIG.defaultLanguage;
    scope.val = JSON.parse(scope.val);
    console.log(scope.val);
    scope.setTab = function(tab) {
      scope.tab = tab;
    };
    scope.formMlS = function() {
       scope.error = '';
       scope.success = '';
      //$scope.dataLoading = true;
      var data = scope.val;
        // CUDService.Go('add', data, 'projects', 'name', function(response) {
        //   if (response.success) {
        //     $scope.editProject(response.newid);
        //   } else {
        //     $scope.newProject.error = response.message;
        //   }
        //   $scope.dataLoading = false;
        // });
      console.log(data);
    };

  }
  return {
    restrict: 'A',
    scope: {
      itype: '=',
      fname: '=',
      flabel: '=',
      val: '='
        //callbackF: '&callbackFn'
    },
    templateUrl: CONFIG.route + '/views/multilang.html',
    link: link
  };
});