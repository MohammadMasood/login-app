app.controller("appCtrl", ['$rootScope', '$scope', '$state', '$location', function ($rootScope, $scope, $state, $location) {

	$scope.isDashboard = function (viewLocation) { 	

		return viewLocation === $location.path();
	};
	$scope.menuItems = [
        {
            title: "Dashboard",
            icon: "dashboard",
            state: "index"
        },
        
    ];
    console.log('getting in to the app controller');
}]);

app.controller('loginController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.login = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function () {
          $location.path('/dashboard');
          $scope.disabled = false;
          $scope.loginForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });

    };

}]);
app.controller('HeaderController',function HeaderController($scope, $location) 
		{ 
			//alert( $location.path());
			$scope.isActive = function (viewLocation) { 
			
				return viewLocation === $location.path();
			};
		}
  );

app.controller('logoutController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.logout = function () {

      // call logout from service
      AuthService.logout()
        .then(function () {
          $location.path('/login');
        });

    };

}]);

app.controller('registerController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {
	
    $scope.register = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

		/*
	  AuthService.register($scope.registerForm.username, $scope.registerForm.password)
        // handle success
        .then(function () {
          $location.path('/login');
          $scope.disabled = false;
          $scope.registerForm = {};
        },function(error){
			
          $scope.error = true;
          $scope.errorMessage = error.err.message;
          $scope.disabled = false;
          $scope.registerForm = {};        		
		})
	  */
      // call register from service
      AuthService.register($scope.registerForm.username, $scope.registerForm.password)
        // handle success
        .then(function () {
          $location.path('/login');
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        // handle error
        .catch(function (error) {
          $scope.error = true;
          $scope.errorMessage = error.err.message;
          $scope.disabled = false;
          $scope.registerForm = {};
        });

    };

}]);
app.controller('ContactController',['$scope', '$http','CommonService',
  function ($scope, $http,CommonService) {	
	
	$scope.MsgSuccess=false;
	$scope.MsgError=false;
	
	$scope.ContactUs = function(){		
		var data = $scope.Contact;				
		CommonService.contact_us(data)		
		.then(function () {
			$scope.MsgSuccess=true;					
			$scope.Contact={};
			$scope.ContactForm.$setPristine();
		})
		// handle error
		.catch(function () {
			$scope.MsgError=true;
		});
	};

}]);