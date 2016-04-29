testApp.controller('footerController', function($scope, CONFIG, $sce) {
  $scope.config = CONFIG;
  var d = new Date();
  $scope.footer = $sce.trustAsHtml('<span class="glyphicon glyphicon-copyright-mark"></span> Wojciech Baran ' + d.getFullYear());
});