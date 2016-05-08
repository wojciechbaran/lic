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
    .when('/' + CONFIG.route + '/about', {
      templateUrl: CONFIG.route + '/views/about.html',
      controller: 'mainController'
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
    .when('/' + CONFIG.route + '/conference/:projectId', {
      templateUrl: CONFIG.route + '/views/conferences.html',
      controller: 'conferenceController'
    })
    //user account
    .when('/' + CONFIG.route + '/user', {
      templateUrl: CONFIG.route + '/views/user.html',
      controller: 'userController'
    })
    .when('/' + CONFIG.route + '/lecturer', {
      templateUrl: CONFIG.route + '/views/lecturer.html',
      controller: 'lecturerController'
    })
    .otherwise({
      redirectTo: '/' + CONFIG.route
    });
  $locationProvider.html5Mode(true);
  document.title = CONFIG.siteName;

});