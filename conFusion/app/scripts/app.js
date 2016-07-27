'use strict';

//using ng-router below for single page applicaiton
// angular.module("confusionApp", ['ngRoute'])
// 	.config(function($routeProvider){
//    		$routeProvider
//    		.when('/contactus', {
//    			templateUrl: 'contactus.html',
//    			controller:  'ContactController'
//    		})
//    		.when('/menu',{
//    			templateUrl: 'menu.html',
//    			controller:  'menuController'
//    		})
//    		.when('/menu/:id', {
//    			templateUrl: 'dishdetail.html',
//    			controller:  'dishDetailController'
//    		})
//    		.otherwise('/contactus');
// 	});


//below is using ui-router for spa
angular.module("confusionApp", ['ui.router', 'ngResource'])
	.config(function($stateProvider, $urlRouterProvider){
		$stateProvider
                    // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html'
                    },
                    'content': {
                        templateUrl : 'views/home.html',
                        controller  : 'IndexController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html'
                    }
                }
            })
                    // route for the aboutus page
            .state('app.aboutus', {
                url:'aboutus',
                views: {
                    'content@': {
                        templateUrl: 'views/aboutus.html',
                        controller: 'AboutController'
                   }
                }
            })
                    // route for the contactus page
            .state('app.contactus', {
                url:'contactus',
                views: {
                    'content@': {
                        templateUrl : 'views/contactus.html',
                        controller  : 'ContactController'
                     }
                }
            })

            // route for the menu page
            .state('app.menu', {
                url: 'menu',
                views: {
                    'content@': {
                        templateUrl : 'views/menu.html',
                        controller  : 'menuController'
                    }
                }
            })

            // route for the dishdetail page
            .state('app.dishdetails', {
                url: 'menu/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/dishdetail.html',
                        controller  : 'dishDetailController'
                   }
                }
            });
            $urlRouterProvider.otherwise('/');
	});


    