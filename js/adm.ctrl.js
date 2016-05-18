testApp.controller('admController', function($scope, CONFIG, SearchService, AuthenticationService, CUDService) {
  $scope.config = CONFIG;
  $scope.tab = 'start';
  //$scope.projectTab = 'start';
  $scope.projectTab = 'sessions';
  $scope.userTab = 'start';
  $scope.projectAddSession={};
  //AuthenticationService.AllowAdmin();
  $scope.listProjectCols = [{
    name: 'name',
    label: 'Nazwa'
  }, {
    name: 'startDate',
    label: 'Data rozpoczęcia'
  }];
  $scope.sessionsCols = [{
    name: 'name',
    label: 'Nazwa'
  }, {
    name: 'number',
    label: 'Numer Sesji'
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
        $scope.listProjectS();
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
  $scope.userDataEditS = function() {
    $scope.userDataEdit={};
    $scope.dataLoading = true;
    var data=[];
    $scope.config.userDataFilds.forEach(function(userDataFild) {
      var t={};
      t[userDataFild.name]=$scope.singleUser[0][userDataFild.name];
      data.push(t);
    });
    $scope.config.lecturerDataFilds.forEach(function(userDataFild) {
      var t={};
      t[userDataFild.name]=$scope.singleUser[0][userDataFild.name];
      data.push(t);
    });
    CUDService.Go('update', data, 'users', $scope.singleUser[0].id, function(response) {
      if (response.success) {
        $scope.userDataEdit.success = 'Zmieniono dane użytkownika';
        $scope.listUsersS();
      } else {
        $scope.userDataEdit.error = response.message;
      }
      $scope.dataLoading = false;
    });
  };
  $scope.userSetTypeAS = function(userType) {
    $scope.userSetTypeA={};
    var data=[{'userType':userType}];
    CUDService.Go('update', data, 'users', $scope.singleUser[0].id, function(response) {
      if (response.success) {
        $scope.userSetTypeA.success = 'Zmieniono uprawnienia użytkownika';
        $scope.singleUser[0].userType=userType;
        $scope.listUsersS();
        $scope.listAdminsS();
      } else {
        $scope.userSetTypeA.error = response.message;
      }
    });
  };
  $scope.generatePassword = function(dataBox) { 
    AuthenticationService.GeneratePassword(function(response){ 
      $scope[dataBox].showPass = true;
      $scope[dataBox].data['password'] = response;
      $scope[dataBox].data['passwordrep'] = response;
    });
  };
  $scope.projectAddSessionS = function() {
    $scope.dataLoading = true;
    var fname = {};
      fname.sessions = {
        number: $scope.projectAddSession.number,
        name: $scope.projectAddSession.name
      };
    var data = [fname];
    console.log(data);
    CUDService.Go('push', data, 'projects', $scope.singleProject[0].id, function(response) {
      if (response.success) {
        $scope.projectAddSession.success = 'Dodano sesje';
        $scope.singleProject[0].sessions.push(fname.sessions);
      } else {
        $scope.projectAddSession.error = response.message;
      }
      $scope.dataLoading = false;
    });
  };
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
  $scope.listContractorsS = function() {
    // type, condition, table, order
    SearchService.search('simple', '', 'contractors', 'id:ASC', function(response) {
      $scope.listContractors = response;
    });
  };
  $scope.editProject = function(id) {
    $scope.setTab('editProject');
    $scope.projectTab = 'start';
    SearchService.search('simple', 'id:' + id, 'projects', '', function(response) {
      $scope.singleProject = response;
        //some sessions and blocks elements
      if($scope.singleProject[0].sessions){
        $scope.projectAddSession.number=$scope.singleProject[0].sessions.length+1;
      }else{
        $scope.projectAddSession.number=1;
      }
      //set users singIn
      if($scope.singleProject[0].users){
        $scope.projectUsersList=[]
        $scope.singleProject[0].users.forEach(function(id){
          SearchService.search('simple', 'id:' + id, 'users', '', function(response) {
            $scope.projectUsersList.push(response[0]);
          });
        });
      }
    });
  };
  $scope.editSessionUpdateS = function(taskMessage,index) {
    $scope[taskMessage]={};
    $scope.dataLoading = true;
    var ftmp = $scope.singleProject[0].sessions[index];
    delete ftmp.$$hashKey;
    var data = ['sessions','name',$scope.singleProject[0].sessions[index].name];
    var where = [{
      id: $scope.singleProject[0].id,
      'sessions.number': $scope.singleProject[0].sessions[index].number
    }];
    CUDService.Go('deepUpdate', data, 'projects', where, function(response) {
      if (response.success) {
        $scope[taskMessage].success = 'Zmieniono dane';
      } else {
        $scope[taskMessage].error = response.message;
      }
      $scope.dataLoading = false;
    });
  };
  $scope.editContractor = function(id) {
    if($scope.singleContractor){
      delete $scope.singleContractor;
    }
    $scope.setTab('editContractor');
    SearchService.search('simple', 'id:' + id, 'contractors', '', function(response) {
      $scope.singleContractor = response;
    });
  };
  $scope.projectEditSession = function(id) {
    $scope.setTab('editSession');
    $scope.projectEditSessionId=id;
    if($scope.singleProject[0].sessions[id].blocks){
      $scope.blockId=$scope.singleProject[0].sessions[id].blocks.length;
    }else{
      $scope.singleProject[0].sessions[id].blocks=[];
    }
    if(!$scope.blockId){
      $scope.blockId=0;
    }
    $scope.singleProject[0].sessions[id].blocks[$scope.blockId]={};
    if($scope.singleProject[0].sessions[id].blocks[$scope.blockId].lectures){
      $scope.lectureId=$scope.singleProject[0].sessions[id].blocks[$scope.blockId].lectures.length;
    }else{
      $scope.lectureId=$scope.singleProject[0].sessions[id].blocks[$scope.blockId].lectures=[];
    }
    if($scope.lectureId){
      $scope.lectureId=0;
    }
    $scope.singleProject[0].sessions[id].blocks[$scope.blockId].lectures[$scope.lectureId]={};
  };
  $scope.addSessionsPlanlectureshow='';
  $scope.addSessionsPlan={};
  $scope.addSessionsPlanS = function () {
    if($scope.addSessionsPlan.duration=='' || $scope.addSessionsPlan.lectureType==''){
      $scope.addSessionsPlan.error='Podaj poprawne wartości';
      return;
    }
    $scope.singleProject[0].sessions[$scope.projectEditSessionId].blocks[$scope.blockId].lectures[$scope.lectureId].duration=$scope.addSessionsPlan.duration;
    $scope.singleProject[0].sessions[$scope.projectEditSessionId].blocks[$scope.blockId].lectures[$scope.lectureId].lectureType=$scope.addSessionsPlan.lectureType;
    $scope.addSessionsPlan.duration='';
    $scope.addSessionsPlan.lectureType='';
    $scope.lectureId++;
    $scope.singleProject[0].sessions[$scope.projectEditSessionId].blocks[$scope.blockId].lectures[$scope.lectureId]={};
  }
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
    fdsarr = $scope.singleProject[0].endDateLecturer.split("/");
    var endDateLecturer = new Date(fdsarr[2], fdsarr[1]-1, fdsarr[0],0,0,0,0);
    fdsarr = $scope.singleProject[0].endDateUser.split("/");
    var endDateUser = new Date(fdsarr[2], fdsarr[1]-1, fdsarr[0],0,0,0,0);
    if(endDate<startDate){
      endDate=startDate;
      $scope.singleProject[0].endDate=$scope.singleProject[0].startDate;
    }
    var data = [{
      startDate: startDate
    },{
      endDate: endDate
    },{
      endDateLecturer: endDateLecturer
    },{
      endDateUser: endDateUser
    }];
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
    $scope.listAdminsS();
    $scope.listContractorsS();
    $scope.editProject('572f4f7c18dd9');
  };
  $scope.init();
});