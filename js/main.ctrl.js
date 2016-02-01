testApp.controller('mainController', function($scope, CONFIG, $rootScope, $route) {
  $scope.config = CONFIG;
  $scope.tab = 'start';
  $scope.currentUser = $rootScope.currentUser;
  if(!$rootScope.defaultLanguage){
    $rootScope.defaultLanguage = $scope.config.defaultLanguage;
  }

  $scope.setTab = function(tab) {
    $scope.tab = tab;
  };
  $scope.setLang = function(lang) {
    $rootScope.defaultLanguage = lang;
    $route.reload();
  };

});