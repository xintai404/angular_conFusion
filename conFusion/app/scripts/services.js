'use strict';
angular.module('confusionApp')
       .constant('baseURL', 'http://localhost:3000/')
       .factory('menuFactory',['$resource', 'baseURL', function($resource, baseURL) {
       	    var menufac = {};
    
            menufac.getPromotion = function(){
              return $resource(baseURL+"promotions/:id", null);
            };
    
            menufac.getDishes = function(){
                return $resource(baseURL+"dishes/:id", null, {'update':{method:'PUT'}});
            };
            return menufac;
        }])
        .factory('corporateFactory', ['$resource', 'baseURL', function($resource, baseURL) {
    
            var corpfac = {};
     
            corpfac.getLeaders = function(){
                return $resource(baseURL +"leadership/:id", null);
            };

           return corpfac;
    
        }])
        .factory('feedbackFactory', ['$resource', 'baseURL', function($resource, baseURL){
          return $resource(baseURL + "feedback/:id");
        }]);