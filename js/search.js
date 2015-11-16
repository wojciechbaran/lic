angular.module('testApp').service('SearchService', function($http, CONFIG) {

  return {
    search: function(type, condition, table, order, callback) {
      var req = {
        type: type,
        table: table,
        condition: condition,
        order: order
      }
      $http.post(CONFIG.baseURL + '/' + CONFIG.route + '/backend/search.php', req)
        .success(function(response, status) {
          callback(response);
        })
        .error(function(response, status) {
          console.log('error');
        });
    }
  };

});