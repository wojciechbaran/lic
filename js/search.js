angular.module('testApp').service('Search', function($http, CONFIG) {

  return {
    search: function(query, type, callback) {
      var req = {
        type: type,
        data: query
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