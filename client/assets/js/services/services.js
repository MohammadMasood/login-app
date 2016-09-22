app.factory('CommonService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    // create user variable
    var user = null;

    // return available functions for use in the controllers
    return ({            
      contact_us: contact_us
    });

    function contact_us(jdata) {
      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/pages/contact-us',jdata )
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

}]);