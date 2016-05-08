testApp.controller('lecturerController', function($scope, CONFIG, $rootScope, $location, CUDService) {
  $scope.config = CONFIG;
  $scope.currentUser = $rootScope.currentUser;

  $scope.upgradeUser = function(){
  	var data=[];
  	$scope.config.userDataFilds.forEach(function(userDataFild) {
  		var t={};
  		t[userDataFild.name]=$scope.currentUser[userDataFild.name];
  		data.push(t);
	});
	$scope.config.lecturerDataFilds.forEach(function(userDataFild) {
  		var t={};
  		t[userDataFild.name]=$scope.currentUser[userDataFild.name];
  		data.push(t);
	});
  	console.log(data);
    CUDService.Go('update', data, 'users', $scope.currentUser.id, function(response) {
      if (response.success) {
        $location.path('/' + CONFIG.route + '/user');
      }
    });
  };
});