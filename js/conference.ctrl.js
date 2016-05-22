testApp.controller('conferenceController', function($scope, CONFIG, $routeParams, $rootScope, SearchService, CUDService, $location) {
  $scope.config = CONFIG;
  $scope.id = $routeParams.projectId;
  $scope.currentUser = $rootScope.currentUser;
  SearchService.search('files', CONFIG.fileUploadPath, '', '', function(response) {
    $scope.listArticles = response;
  });
  SearchService.search('simple', 'id:' + $scope.id, 'projects', '', function(response) {
  	$scope.singleProject = response;
  	if($scope.currentUser && $scope.currentUser.id){
  		if(jQuery.inArray( $scope.currentUser.id, $scope.singleProject[0].users ) != -1){
	  		$scope.singInStatus=true;

	  	}
  	}
  });
  $scope.singInStatus=false;
  $scope.singInMessage='';
  $scope.setTabSession = function(tab) {
    $scope.sessionTab = tab;
  };
  $scope.showSessionInfo = function(id){
    $('#'+id).toggleClass('hidden').toggleClass('show',function(){
      $('.sessionInfo').addClass('hidden').removeClass('show');
    });
  };
  $scope.singIn = function(userId, projektID){
    CUDService.Go('singIn', 'in', userId, projektID, function(response) {
      if (response.success) {
        $scope.singInStatus=true;
      }else{
    	$scope.singInMessage='Wystąpił błąd';
    	}
    });
  };
  $scope.singOut = function(userId, projektID){
    CUDService.Go('singIn', 'out', userId, projektID, function(response) {
      if (response.success) {
        $scope.singInStatus=false;
      }else{
    	$scope.singInMessage='Wystąpił błąd';
    	}
    });
  };
});