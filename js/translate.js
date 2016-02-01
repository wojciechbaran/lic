angular.module('testApp').filter('translate', function(EN, DE, CONFIG, $rootScope) {

  return function(input) {
    var lang = $rootScope.defaultLanguage;
    // if ($rootScope && $rootScope.currentUser && $rootScope.currentUser.language) {
    //   lang = $rootScope.currentUser.language;
    // }
    switch (lang) {
      case 'en':
        if (EN[input]) {
          return EN[input];
        }
        return input;
        break;
      case 'de':
        if (DE[input]) {
          return DE[input];
        }
        return input;
        break;
      default:
        return input;
    }
  };

});