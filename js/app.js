testApp.config(function($routeProvider, $locationProvider, $httpProvider, CONFIG) {
  $routeProvider

    .when('/' + CONFIG.route, {
      templateUrl: CONFIG.route + '/views/start.html',
      controller: 'mainController'
    })
    .when('/' + CONFIG.route + '/adm', {
      templateUrl: CONFIG.route + '/views/adm.html',
      controller: 'admController'
    })
    .when('/' + CONFIG.route + '/login', {
      templateUrl: CONFIG.route + '/views/login.html',
      controller: 'loginController'
    })
    .when('/' + CONFIG.route + '/register', {
      templateUrl: CONFIG.route + '/views/register.html',
      controller: 'registerController'
    })
    //all conferences for guest
    .when('/' + CONFIG.route + '/conference', {
      templateUrl: CONFIG.route + '/views/conferences.html',
      controller: 'conferenceController'
    })
    //choosen conference for guest
    .when('/' + CONFIG.route + '/conference/:id', {
      templateUrl: CONFIG.route + '/views/conference.html',
      controller: 'conferenceController'
    })
    .otherwise({
      redirectTo: '/' + CONFIG.route
    });
  $locationProvider.html5Mode(true);
  document.title = CONFIG.siteName;
});