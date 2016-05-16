testApp.controller('userController', function($scope, CONFIG, AuthenticationService, CUDService, $location, $rootScope, $cookies,SearchService) {
  $scope.config = CONFIG;
  $scope.tab = 'start';
  AuthenticationService.Allow();
  $scope.currentUser = $rootScope.currentUser;
  console.log($scope.currentUser);
  $scope.newProjectsC = false;
  $scope.myProjectsC = false;
  var query = {$or: [{projectStatus:1},{projectStatus:2}]};
  SearchService.search('advenced', query, 'projects', '', function(response) {
    $scope.newProjects = response;
    if($scope.newProjects && Object.prototype.toString.call( $scope.newProjects ) === '[object Array]'){
      $scope.newProjectsC=true;
    }
  });
  if($scope.currentUser && $scope.currentUser.projects){
    $scope.myProjects=[]
    $scope.myProjectsC = true;
    $scope.currentUser.projects.forEach(function(id){
      SearchService.search('simple', 'id:' + id, 'projects', '', function(response) {
        $scope.myProjects.push(response[0]);
      });
    });
  }
  $scope.setTab = function(tab) {
    $scope.tab = tab;
  };
  if($scope.currentUser){
    if($scope.currentUser.articles){
      $scope.articleId=$scope.currentUser.articles.length;
    }else{
      $scope.currentUser.articles=[];
    }  
    if(!$scope.articleId){
      $scope.articleId=0;
    }
    $scope.currentUser.articles[$scope.articleId]={};
    $scope.currentUser.articles[$scope.articleId].title={};
    $scope.currentUser.articles[$scope.articleId].title.pl='';
    $scope.currentUser.articles[$scope.articleId].title.en='';
  }
  $scope.addArticle={};
  $scope.addArticleS = function(){
    $scope.addArticle.error = '';
    $scope.addArticle.success = '';
    $scope.dataLoading = true;
    var tart = {articles:$scope.currentUser.articles[$scope.articleId]};
    var data=[tart];
    console.log(data);
    CUDService.Go('push', data, 'users', $scope.currentUser.id, function(response) {
      if (response.success) {
        $scope.addArticle.success = 'Dodano artykuł';
        $scope.articleId++;
      } else {
        $scope.addArticle.error = response.message;
      }
      $scope.dataLoading = false;
    });
  }
  $scope.changeUserData = function() {
    $scope.formUD.error = '';
    $scope.formUD.success = '';
    $scope.dataLoading = true;
    var data = [{
      name: $scope.currentUser.name,
      surname: $scope.currentUser.surname,
      email: $scope.currentUser.email
    }];
    //CUDService.UserUpdate($scope.currentUser, $scope.currentUser.userid, function(response) {
    CUDService.Go('update', data, 'users', $scope.currentUser.id, function(response) {
      if (response.success) {
        $scope.formUD.success = response.message;
      } else {
        $scope.formUD.error = response.message;
      }
      $scope.dataLoading = false;
    });
  };
  $scope.changePassword = function(tab) {
    $scope.formCP.error = '';
    $scope.formCP.success = '';
    $scope.dataLoading = true;
    CUDService.ChangePassword($scope.formCP.dt, $scope.currentUser.id, function(response) {
      if (response.success) {
        $scope.formCP.success = response.message;
      } else {
        $scope.formCP.error = response.message;
      }
      $scope.dataLoading = false;
    });
  };
});