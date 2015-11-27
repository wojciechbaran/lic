testApp.directive('ngMultilang', function(CONFIG,CUDService) {
  function link(scope) {
    scope.languages = CONFIG.languages;
    scope.tab = CONFIG.defaultLanguage;
    scope.eval = [];
    scope.setTab = function(tab) {
      scope.tab = tab;
    };
    scope.setEval = function() {
      if (scope.val && typeof(scope.val) == 'string') {
        scope.val = JSON.parse(scope.val);
      }
      if (scope.val && scope.val.pl) {
        scope.eval['pl'] = scope.val.pl;
      } else {
        scope.eval['pl'] = '';
      }
      if (scope.val && scope.val.en) {
        scope.eval['en'] = scope.val.en;
      } else {
        scope.eval['en'] = '';
      }
    }
    scope.formMlS = function() {
      scope.error = '';
      scope.success = '';
      scope.dataLoading = true;
      var data = {
        name: scope.fname,
        val: scope.eval
      };
      CUDService.Go('update', data, 'projects', scope.fid, function(response) {
        if (response.success) {
          scope.success = response.message;
        } else {
          scope.error = response.message;
        }
        scope.dataLoading = false;
      });
    }
    scope.$watch('val', scope.setEval);
  }
  return {
    restrict: 'A',
    scope: {
      itype: '=',
      fname: '=',
      flabel: '=',
      fid: '=',
      val: '='
    },
    templateUrl: CONFIG.route + '/views/multilang.html',
    link: link
  };
});