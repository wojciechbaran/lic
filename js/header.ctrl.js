testApp.controller('headerController', function($scope, CONFIG, $cookies, $rootScope) {
  $scope.config = CONFIG;
  $scope.defaultLanguage = $rootScope.defaultLanguage;
  $scope.setLang = function(lang) {
    $rootScope.defaultLanguage = lang;
    $scope.defaultLanguage =  lang;
  };

});