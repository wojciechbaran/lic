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
      name: $scope.newProject.projectName
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
      data: JSON.stringify({
       description: $scope.newContractorD.contractordescription, 
       street: $scope.newContractorD.street, 
       kode: $scope.newContractorD.kode, 
       city: $scope.newContractorD.city,
       nip: $scope.newContractorD.nip,
       regon: $scope.newContractorD.regon
      })
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
  $scope.listProjectS = function() {
    // type, condition, table, order
    SearchService.search('simple', '', 'projects', 'id ASC', function(response) {
      $scope.listProject = response;
    });
  };
  $scope.listUsersS = function() {
    // type, condition, table, order
    SearchService.search('simple', 'type=\'user\'', 'users', 'id ASC', function(response) {
      $scope.listUsers = response;
    });
  };
  $scope.listAdminsS = function() {
    // type, condition, table, order
    SearchService.search('simple', 'type=\'admin\'', 'users', 'id ASC', function(response) {
      $scope.listAdmins = response;
    });
  };
  $scope.listGuestsS = function() {
    // type, condition, table, order
    SearchService.search('simple', 'type=\'guest\'', 'users', 'id ASC', function(response) {
      $scope.listGuests = response;
    });
  };
  $scope.listLecturersS = function() {
    // type, condition, table, order
    SearchService.search('simple', 'type=\'lecturer\'', 'users', 'id ASC', function(response) {
      $scope.listLecturers = response;
    });
  };
  $scope.listContractorsS = function() {
    // type, condition, table, order
    SearchService.search('simple', '', 'contractors', 'id ASC', function(response) {
      $scope.listContractors = response;
    });
  };
  $scope.editProject = function(id) {
    $scope.setTab('editProject');
    SearchService.search('simple', 'id=' + id, 'projects', '', function(response) {
      $scope.singleProject = response;
    });
  };
  $scope.editContractor = function(id) {
    $scope.setTab('editContractor');
    SearchService.search('simple', 'id=' + id, 'contractors', '', function(response) {
      $scope.singleContractor = response;
    });
  };
  $scope.editUser = function(id) {
    $scope.setTab('editUser');
    SearchService.search('simple', 'id=' + id, 'users', '', function(response) {
      $scope.singleUser = response;
    });
  };
  $scope.init = function() {
    $scope.listProjectS();
    $scope.listUsersS();
    $scope.listLecturersS();
    $scope.listGuestsS();
    $scope.listAdminsS();
    $scope.listContractorsS();
    $scope.editProject(1);
  };
  $scope.init();
});