testApp.controller('footerController', function($scope, CONFIG, $sce) {
  $scope.config = CONFIG;
  $scope.footer = $sce.trustAsHtml('<span class="glyphicon glyphicon-copyright-mark"></span> Wojciech Baran 2015');
});