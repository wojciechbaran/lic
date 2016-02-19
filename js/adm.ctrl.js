testApp.controller('admController', function($scope, CONFIG, SearchService, AuthenticationService, CUDService) {
  $scope.config = CONFIG;
  $scope.tab = 'start';
  $scope.projectTab = 'start';
  AuthenticationService.AllowAdmin();
  $scope.listProjectCols = [{
    name: 'name',
    label: 'Nazwa'
  }, {
    name: 'startDate',
    label: 'Data rozpoczęcia'
  }];
  $scope.listUsersCols = [{
    name: 'username',
    label: 'Login'
  }, {
    name: 'name',
    label: 'Imie'
  }, {
    name: 'surname',
    label: 'Nazwisko'
  }, {
    name: 'lastlogin',
    label: 'Ostatnie logowanie',
  }];
  $scope.contractorsCols = [{
    name: 'name',
    label: 'Nazwa'
  }, {
    name: 'servicetype',
    label: 'Typ'
  }, {
    name: 'city',
    label: 'Miejscowość'
  }];
  $scope.setTab = function(tab) {
    $scope.tab = tab;
  };
  $scope.setTabEdit = function(tab, project) {
    $scope[project] = tab;
  };
  $scope.newProjectS = function() {
    $scope.newProject.error = '';
    $scope.newProject.success = '';
    $scope.dataLoading = true;
    var data = {
      name: $scope.newProject.projectName,
      projectStatus: 0
    }
    CUDService.Go('add', data, 'projects', 'name', function(response) {
      if (response.success) {
        $scope.editProject(response.newid);
      } else {
        $scope.newProject.error = response.message;
      }
      $scope.dataLoading = false;
    });
  };
  $scope.newContractorS = function() {
    $scope.newContractorD.error = '';
    $scope.newContractorD.success = '';
    $scope.dataLoading = true;
    var data = {
      name: $scope.newContractorD.contractorname,
      servicetype: $scope.newContractorD.servicetype,
      description: $scope.newContractorD.contractordescription,
      street: $scope.newContractorD.street,
      kode: $scope.newContractorD.kode,
      city: $scope.newContractorD.city,
      nip: $scope.newContractorD.nip,
      regon: $scope.newContractorD.regon
    };
    CUDService.Go('add', data, 'contractors', 'name', function(response) {
      if (response.success) {
        $scope.newContractorD.success = response.message;
      } else {
        $scope.newContractorD.error = response.message;
      }
      $scope.dataLoading = false;
    });
  };
  $scope.newUserS = function() {
    $scope.dataLoading = true;
    AuthenticationService.Register($scope.newUserD, function(response) {
      if (response.success) {
        $scope.newUserD.success = 'Dodano nowego użytkownika';
        $scope.listUsersS();
      } else {
        $scope.newUserD.error = response.message;
      }
      $scope.dataLoading = false;
    });
  };
  $scope.generatePassword = function() { 
    AuthenticationService.GeneratePassword(function(response){ 
      $scope.newUserD.showPass = true;
      $scope.newUserD.data['password'] = response;
      $scope.newUserD.data['passwordrep'] = response;
    });
  }
  $scope.listProjectS = function() {
    // type, condition, table, order
    SearchService.search('simple', '', 'projects', 'id:ASC', function(response) {
      $scope.listProject = response;
    });
  };
  $scope.listUsersS = function() {
    // type, condition, table, order
    SearchService.search('simple', 'userType:user', 'users', 'id:ASC', function(response) {
      $scope.listUsers = response;
    });
  };
  $scope.listAdminsS = function() {
    // type, condition, table, order
    SearchService.search('simple', 'userType:admin', 'users', 'id:ASC', function(response) {
      $scope.listAdmins = response;
    });
  };
  $scope.listGuestsS = function() {
    // type, condition, table, order
    SearchService.search('simple', 'userType:guest', 'users', 'id:ASC', function(response) {
      $scope.listGuests = response;
    });
  };
  $scope.listLecturersS = function() {
    // type, condition, table, order
    SearchService.search('simple', 'userType:lecturer', 'users', 'id:ASC', function(response) {
      $scope.listLecturers = response;
    });
  };
  $scope.listContractorsS = function() {
    // type, condition, table, order
    SearchService.search('simple', '', 'contractors', 'id:ASC', function(response) {
      $scope.listContractors = response;
    });
  };
  $scope.editProject = function(id) {
    $scope.setTab('editProject');
    SearchService.search('simple', 'id:' + id, 'projects', '', function(response) {
      $scope.singleProject = response;
    });
  };
  $scope.editContractor = function(id) {
    $scope.setTab('editContractor');
    SearchService.search('simple', 'id:' + id, 'contractors', '', function(response) {
      $scope.singleContractor = response;
    });
  };
  $scope.editUser = function(id) {
    $scope.setTab('editUser');
    SearchService.search('simple', 'id:' + id, 'users', '', function(response) {
      $scope.singleUser = response;
    });
  };
  $scope.setStatus = function(id, status) {
    var data = [{
      projectStatus: status
    }];
    CUDService.Go('update', data, 'projects', id, function(response) {
      if (response.success) {
        $scope.singleProject[0].projectStatus = status;
        $scope.setStatus.message = 'Zmieniono status';
      }
    });

  };
  $scope.setDate = function() {
    $scope.setDateD={};
    $scope.setDateD.error = '';
    $scope.setDateD.success = '';
    $scope.dataLoading = true;
    var fdsarr = $scope.singleProject[0].startDate.split("/");
    var startDate = new Date(fdsarr[2], fdsarr[1]-1, fdsarr[0],0,0,0,0);
    fdsarr = $scope.singleProject[0].endDate.split("/");
    var endDate = new Date(fdsarr[2], fdsarr[1]-1, fdsarr[0],0,0,0,0);
    var data = [{
      startDate: startDate
    },{
      endDate: endDate
    }];
    if(endDate<startDate){
      endDate=startDate;
      $scope.singleProject[0].endDate=$scope.singleProject[0].startDate;
    }
    CUDService.Go('update', data, 'projects', $scope.singleProject[0].id, function(response) {
      if (response.success) {
        $scope.setDateD.success = response.message;
      } else {
        $scope.setDateD.error = response.message;
      }
      $scope.dataLoading = false;
    });
  };
  $scope.setPlaceS = function() {
    $scope.setPlaceD={};
    $scope.setPlaceD.error = '';
    $scope.setPlaceD.success = '';
    $scope.dataLoading = true;
    var data=[{
      place: $scope.singleProject[0].place
    }];
    CUDService.Go('update', data, 'projects', $scope.singleProject[0].id, function(response) {
      if (response.success) {
        $scope.setPlaceD.success = response.message;
      } else {
        $scope.setPlaceD.error = response.message;
      }
      $scope.dataLoading = false;
    });
  };

  $scope.init = function() {
    $scope.listProjectS();
    $scope.listUsersS();
    $scope.listLecturersS();
    $scope.listGuestsS();
    $scope.listAdminsS();
    $scope.listContractorsS();
        //$scope.editProject('565db46f61fff');
    //$scope.editProject('56c764d23781c');
  };
  $scope.init();
});