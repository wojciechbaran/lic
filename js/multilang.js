testApp.directive('ngMultilang', function(CONFIG) {
  function link(scope) {
    scope.languages = CONFIG.languages;
    scope.tab = CONFIG.defaultLanguage;
    console.log(scope.val);
    scope.setTab = function(tab) {
      scope.tab = tab;
    };
    scope.formMlS = function() {
       scope.error = '';
       scope.success = '';
      //$scope.dataLoading = true;
      var data = {
          name: scope.val[scope.tab],
          lang: scope.tab
        }
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