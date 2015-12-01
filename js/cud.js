angular.module('testApp').service('CUDService', function($http, CONFIG) {

  return {
    Go: function(type, data, table, id, callback) {
      var req = {
        type: type,
        id: id,
        table: table,
        data: data
      }
      $http.post(CONFIG.baseURL + '/' + CONFIG.route + '/backend/cud.php', req)
        .success(function(response, status) {
          callback(response);
        })
        .error(function(response, status) {
          console.log('error');
        });
    },
    ChangePassword: function(data, id, callback) {
      var req = {
        type: 'changepassword',
        id: id,
        data: data
      }
      $http.post(CONFIG.baseURL + '/' + CONFIG.route + '/backend/cud.php', req)
        .success(function(response, status) {
          callback(response);
        })
        .error(function(response, status) {
          console.log('error');
        });
    }
  };

});