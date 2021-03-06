testApp.controller('mainController', function($scope, CONFIG, $rootScope, $route, AuthenticationService, $location) {
  $scope.config = CONFIG;
  $scope.tab = 'start';
  AuthenticationService.IsLogin();
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
  $scope.goTo = function(loc) {
    $scope.tab = 'start';
    $location.path( $scope.config.route + loc );
  };
  $scope.logout = function() {
    AuthenticationService.ClearCredentials();
    $location.path('/' + $scope.config.route);
  };
});