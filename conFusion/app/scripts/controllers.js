'use strict';
angular.module("confusionApp")
    .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory',
      function($scope, menuFactory, corporateFactory){
        $scope.chef = {};
        $scope.proto = {};
        $scope.dish  = {};
        $scope.message = "Loading ...";
        $scope.showMenu = false;
        menuFactory.getDishes().get({id:0}).$promise
        .then(
          function(response){
            $scope.dish = response;
            $scope.showDish = true;
          },
          function(response){
            $scope.message = "Error: " +response.status + " " + response.statusText; 
          }
        );
        $scope.proto_message="Loading ...";
        $scope.showProto = false;
        menuFactory.getPromotion().get({id:0}).$promise
        .then(
          function(response){
            $scope.proto = response;
            $scope.showProto = true;
          },
          function(response){
            $scope.proto_message = "Error: " + response.status + " " + response.statusText;
          }
        );

        $scope.chef_message="Loading ...";
        $scope.showChef = false;
        corporateFactory.getLeaders().get({id:0}).$promise
        .then(
          function(response){
            $scope.chef = response;
            $scope.showChef = true;
          },
          function(response){
            $scope.chef_message = "Error: " + response.status + " " + response.statusText;
          }
        );

      }])
    .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory){
      $scope.persons = corporateFactory.getLeaders().query();
    }])
    .controller('menuController', ['$scope', 'menuFactory', function($scope, menuFactory){

      $scope.dishes={};
      $scope.message = "Loading ...";
      $scope.showMenu = false;
      menuFactory.getDishes().query(
        function(response){
          $scope.dishes = response;
          $scope.showMenu = true;
        },
        function(response){
            $scope.message = "Error: " +response.status + " " + response.statusText; 
        }
      );
      $scope.tab = 1;
      $scope.filtText = '';
      $scope.showDetails = false;
      $scope.select = function(setTab){
        $scope.tab = setTab;
        if (setTab === 2){
                    $scope.filtText = "appetizer";
                }else if (setTab === 3){
                    $scope.filtText = "mains";
                }else if (setTab === 4){
                    $scope.filtText = "dessert";
                }else{
                    $scope.filtText = "";
                  }
      };
      $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
      };
      $scope.toggleDetails = function(){
        $scope.showDetails = !$scope.showDetails;
      };
    }])

    .controller('ContactController', ['$scope', function($scope) {

      $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
      var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
      $scope.channels = channels;
      $scope.invalidChannelSelection = false;
    }])

    .controller('FeedbackController', ['$scope', function($scope) {
      $scope.sendFeedback = function() {
        if ($scope.feedback.agree && ($scope.feedback.mychannel ==="") && !$scope.feedback.mychannel) {
          $scope.invalidChannelSelection = true;
                      console.log('incorrect');
        }
        else {
          $scope.invalidChannelSelection = false;
          $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                                         agree:false, email:"" };
          $scope.feedback.mychannel="";

          $scope.feedbackForm.$setPristine();
        }
      };
    }])

    .controller('dishDetailController', ['$scope', '$stateParams', 'menuFactory', 
         function($scope, $stateParams, menuFactory) {
            
            $scope.dish={};
            $scope.showDish = false;
            $scope.message = "Loading ...";
            menuFactory.getDishes().get({id:parseInt($stateParams.id, 10)})
            .$promise.then(
              function(response){
                $scope.dish = response;
                $scope.showDish = true;
                console.log(response);
              },
              function(response){
                $scope.message = "Error: " +response.status + " " + response.statusText; 
              }
            );
            $scope.property = '';
            $scope.reverse = true;
            $scope.textVar='';
            

            $scope.sortby = function(){
              $scope.reverse = $scope.textVar.indexOf('-') === 0;
              $scope.property= $scope.reverse? $scope.textVar.substring(1): $scope.textVar.substring(0);
            };
    }])

    .controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory){
      
      var new_comment = {rating:null, comment:'', author:'', date:null};
      $scope.new_comment = new_comment;
      $scope.submitComment = function () {
        
        var monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];

        var date = new Date();
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        $scope.new_comment.date = monthNames[monthIndex] + ". " + day+", "+year;
        
        $scope.dish.comments.push($scope.new_comment);
        menuFactory.getDishes().update({id: $scope.dish.id}, $scope.dish);

        $scope.new_comment =  {rating:null, comment:'', author:'', date:null};

        $scope.commentForm.$setPristine();
      };      
    }])
    
    .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory){
      var feed = new feedbackFactory();
      $scope.feedback = {firstName:'', lastName:'', tel:null, email:'',mychannel:'', comments:''};
      $scope.sendFeedback = function(){
        console.log($scope.feedback);
        feed= $scope.feedback;
        feedbackFactory.save(feed);

        $scope.feedback = {firstName:'', lastName:'', tel:null, email:'',mychannel:'', comments:''};
        $scope.feedbackForm.$setPristine();
      };
    }]);


    