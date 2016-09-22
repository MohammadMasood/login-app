var app = angular.module('app', ['ui.router','ngProgress']);

app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider, $modalInstance) {
	
	$stateProvider
	.state('home', {
		url: '/',		
		views: {         
		  header: { templateUrl: 'pages/inc/header.html'  },
		  slider: { templateUrl: 'pages/inc/slider.html'  },
          main: { templateUrl: 'pages/home.html' },
		  footer: { templateUrl: 'pages/inc/footer.html'  },
        },	
		access: {restricted: false}
	})
	.state('about-us', {
	  url: '/about-us',	          
      views: {			
			header: { templateUrl: 'pages/inc/header.html' },
			main: { templateUrl: 'pages/about-us.html' },
			footer: { templateUrl: 'pages/inc/footer.html'  },
        },	         
      access: {restricted: false}
    })
	.state('contact-us', {
	  url: '/contact-us',	          	  
      views: {			
			header: { templateUrl: 'pages/inc/header.html' },
			main: { templateUrl: 'pages/contact-us.html' },
			footer: { templateUrl: 'pages/inc/footer.html'  },
        },	
	  controller: 'ContactController',	
      access: {restricted: false}
    })
	.state('/login', {
		url: '/login',
		views: {	
			header: { templateUrl: 'pages/inc/header.html'  },
			main: { templateUrl: 'pages/login.html' },
			footer: { templateUrl: 'pages/inc/footer.html'  },
        },
		controller: 'loginController',
		access: {restricted: false}
	})
	.state('/logout', {
		url: '/logout',
		controller: 'logoutController',
		access: {restricted: true}
	})		
	.state('/register', {
		url: '/register',
		views: {				
			header: { templateUrl: 'pages/inc/header.html'  },
			main: { templateUrl: 'pages/register.html' },
			footer: { templateUrl: 'pages/inc/footer.html'  },
        },
		controller: 'registerController',
		access: {restricted: false}
	})
    .state('dashboard', {
		url: '/dashboard',
		views: {
			header: { templateUrl: 'pages/inc/header.html' },	
			main: { templateUrl: 'pages/dashboard.html' },
			footer: { templateUrl: 'pages/inc/footer.html'  },
			
        },
		access: {restricted: true}
	});	
	
	$urlRouterProvider.otherwise('/');
	$locationProvider.html5Mode({
	enabled: true,
	requireBase: false
	});
}]);

app.run(function($rootScope, ngProgress) {
  $rootScope.$on('$routeChangeStart', function(ev,data) {
    ngProgress.start();
  });
  $rootScope.$on('$routeChangeSuccess', function(ev,data) {
    ngProgress.complete();
  });
});

app.run(function ($rootScope, $location, $state, AuthService) {
  $rootScope.$on('$stateChangeStart',
    function (event, next, current) {
      AuthService.getUserStatus()
      .then(function(){
			$rootScope.LoggedIn=AuthService.isLoggedIn();		
			// Login Related //
			if (next.access.restricted && !AuthService.isLoggedIn()){
				$location.path('/login');
				$state.go('login');
			}
			
			//End Login Related //

			//Slider Related //
			if($location.path()=='/' || $location.path()=='/home'){
					$rootScope.showSlide=true;
			}
			else{
				$rootScope.showSlide= false;
			}
			//End Slider Related //
		
      });
  });
});