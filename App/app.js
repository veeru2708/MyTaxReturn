  var app = angular.module('myTaxReturnApp', ['ui.router'])
      app.controller('dashboardController', function($scope) {

      	$scope.returnshistory =
        {
          "returns":[
          {
            "year": "2013",
            "fillingStatus":"Approved",
            "ITRVStatus": "Approved",
            "refundStatus": "Approved"      
          },
          {
            "year": "2014",
            "fillingStatus":"Approved",
            "ITRVStatus": "Approved",
            "refundStatus": "Approved"  
          }
          ]
        };
});
      app.controller('taxreturninfoController',function($scope){
             $scope.formData = {};
             $scope.steps = [
    'Step 1: Personal Info',
    'Step 2: Address & Bank Info',
    'Step 3: Income Activity'
  ];
  $scope.selection = $scope.steps[0];

  $scope.getCurrentStepIndex = function(){
    // Get the index of the current step given selection
    return _.indexOf($scope.steps, $scope.selection);
  };

  // Go to a defined step index
  $scope.goToStep = function(index) {
    if ( !_.isUndefined($scope.steps[index]) )
    {
      $scope.selection = $scope.steps[index];
    }
  };

  $scope.hasNextStep = function(){
    var stepIndex = $scope.getCurrentStepIndex();
    var nextStep = stepIndex + 1;
    // Return true if there is a next step, false if not
    return !_.isUndefined($scope.steps[nextStep]);
  };

  $scope.hasPreviousStep = function(){
    var stepIndex = $scope.getCurrentStepIndex();
    var previousStep = stepIndex - 1;
    // Return true if there is a next step, false if not
    return !_.isUndefined($scope.steps[previousStep]);
  };

  $scope.incrementStep = function() {
    if ( $scope.hasNextStep() )
    {
      var stepIndex = $scope.getCurrentStepIndex();
      var nextStep = stepIndex + 1;
      $scope.selection = $scope.steps[nextStep];
    }
  };

  $scope.decrementStep = function() {
    if ( $scope.hasPreviousStep() )
    {
      var stepIndex = $scope.getCurrentStepIndex();
      var previousStep = stepIndex - 1;
      $scope.selection = $scope.steps[previousStep];
    }
  };

  $scope.processData = function(){
    console.log($scope.formdata);

  }

      });


      // configuring our routes 
// =============================================================================
app.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
    
        // route to show our basic form (/form)
        // .state('form', {
        //     url: '/form',
        //     templateUrl: 'form.html',
        //     controller: 'formController'
        // })
        
        // // nested states 
        // // each of these sections will have their own view
        // // url will be nested (/form/profile)
        // .state('form.profile', {
        //     url: '/profile',
        //     templateUrl: 'form-profile.html'
        // })
        
        // // url will be /form/interests
        // .state('form.interests', {
        //     url: '/interests',
        //     templateUrl: 'form-interests.html'
        // })
        
        // // url will be /form/payment
        // .state('form.payment', {
        //     url: '/payment',
        //     templateUrl: 'form-payment.html'
        // })
       
		.state('dashboard', {
            url: '/dashboard',
            templateUrl: 'dashboard.html',
            controller: 'dashboardController'
        })

        .state('personalinfo', {
            url: '/taxreturndetails',
            templateUrl: 'personalInfo.html',
            controller: 'taxreturninfoController'
        });

    // catch all route
    // send users to the form page 
    $urlRouterProvider.otherwise('/dashboardController');
})
