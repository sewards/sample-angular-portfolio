/**
 * @author Shane Seward
 *
 * Admin section controllers
 */
define(['angular',
        '../services',
        'bootstrap',
        'ngGrid',
        'moment',
        'jquery',
        'imagesloaded'],
        function (angular,
                  services,
                  bootstrap,
                  ngGrid,
                  moment,
                  $,
                  imagesloaded) {

    // Force strict coding
	'use strict';

            // Create Angular module
	return angular.module('myApp.adminControllers', ['myApp.services'])


    /**
     * Top level admin controller
     */
    .controller('AdminCtrl', ['$scope',
                                '$log',
                                '$rootScope',
                                '$routeParams',
                                'Authentication',
                                '$location',
                                function ($scope,
                                          $log,
                                          $rootScope,
                                          $routeParams,
                                          Authentication,
                                          $location)
    {
        // Root Propertires
        $rootScope.pagetitle = "Admin";

        // Scope Propertires
        $scope.grid;

        $location.path("/login");
        /*
        Authentication.login($rootScope.user).then(function() {
            if(Authentication.data() == "true")
            {
                $log.info("LOG SUCCESS");
            }else{
                $log.info("LOG FAIL");
                // Store current location for use after login
                $rootScope.location =  $location.path();
                // Redirect to login page
                $location.path("/login")
            }
        });
        //$log.info("AdminCtrl authorised ");
        $scope.grid = $routeParams.grid;
         */
    }])


    /**
     * User login form controller
     */
    .controller('LoginCtrl', [
                            '$scope',
                            '$log',
                            '$rootScope',
                            '$routeParams',
                            'Authentication',
                            '$location',
                            function ($scope,
                                      $log,
                                      $rootScope,
                                      $routeParams,
                                      Authentication,
                                      $location)
    {
        // Root Propertires
        $rootScope.pagetitle = "Login";

        /**
         * Login form submit
         * Authenicate user on server
         */
        $scope.submit = function()
        {
            return;
            /*
            Authentication.login($rootScope.user).then(function() {
                $log.info("LOG RETURN"+Authentication.data());
                if(Authentication.data() == "true")
                {
                    $log.info("LOG SUCCESS");
                    // Redirect to previous location
                    $location.path($rootScope.location)
                }else{
                    $log.info("LOG FAIL");
                }
            });
            */
        }

    }])

    /**
     * Add work item controller
     */
    .controller('AddWorkCtrl', [
                                '$scope',
                                '$rootScope',
                                'Work',
                                '$http',
                                '$log',
                                '$location',
                                function ($scope,
                                          $rootScope,
                                          Work,
                                          $http,
                                          $log,
                                          $location)
    {
        // Root Propertires
        $rootScope.pagetitle = "Add Work";
        $rootScope.currentWork = {
            "logo": "",
            "start": "",
            "end": "",
            "client": "",
            "clientLink": "",
            "role": "",
            "type": "",
            "summary": "",
            "body": ""
        };

        // Scope Propertires
        $scope.submitLabel = "Add";


        /**
         * Submit work item to server
         */
        $scope.submit = function()
        {
            // Add to Work service
            Work.add($rootScope.currentWork);
            // reditect back to grid to see new item added
            $location.path('/admin/grid/1').replace();
        }

        /**
         * Cancel and return to grid view
         */
        $scope.cancel = function()
        {
            $location.path('/admin/grid/1').replace();
        }

    }])

    /**
     * Edit work item controller
     */
    .controller('EditWorkCtrl', [
                                '$scope',
                                '$rootScope',
                                'Work',
                                '$http',
                                '$log',
                                '$location',
                                function ($scope,
                                          $rootScope,
                                          Work,
                                          $http,
                                          $log,
                                          $location)
    {
        // Root Propertires
        $rootScope.pagetitle = "Edit Work";

        // Scope Propertires
        $scope.submitLabel = "Update";

        /**
         * Submit updated work item
         */
        $scope.submit = function()
        {
            // Update with service
            Work.update($rootScope.currentWork);
            // Redirec back to grid to see updates
            $location.path('/admin/grid/1').replace();
        }

        /**
         * Cancel update and return to grid view
         */
        $scope.cancel = function()
        {
            $location.path('/admin/grid/1').replace();
        }

    }])

    /**
     * Add portfolio item controller
     */
    .controller('AddPortfolioCtrl', [
                                    '$scope',
                                    '$rootScope',
                                    'Portfolio',
                                    '$http',
                                    '$log',
                                    '$location',
                                    function ($scope,
                                              $rootScope,
                                              Portfolio,
                                              $http,
                                              $log,
                                              $location)
    {
        // Root Propertires
        $rootScope.pagetitle = "Add Portfolio";
        $rootScope.currentPortfolio = {
            image: [],
            title: "",
            start: "",
            end: "",
            client: "",
            clientLink:"",
            role: "",
            tech: "",
            body: "",
            tags: "",
            video: "",
            summary: "",
            awards: []
        }

        // Scope Propertires
        $scope.submitLabel = "Add";


        /**
         * Submit new portfolio item to service
         */
        $scope.submit = function()
        {
            // Add portfolio item
            Portfolio.add($rootScope.currentPortfolio);
            // Redirect back to grid to see new item added
            $location.path('/admin/grid/2').replace();
        }

        /**
         * Cancel adding item and return to gris view
         */
        $scope.cancel = function()
        {
            $location.path('/admin/grid/2').replace();
        }

    }])

    /**
     * Edit existing portfolio item controller
     */
    .controller('EditPortfolioCtrl', [
                                    '$scope',
                                    '$rootScope',
                                    'Portfolio',
                                    '$http',
                                    '$log',
                                    '$location',
                                    function ($scope,
                                              $rootScope,
                                              Portfolio,
                                              $http,
                                              $log,
                                              $location)
    {
        // Root Propertires
        $rootScope.pagetitle = "Edit Protfolio";

        // Root Propertires
        $scope.submitLabel = "Update";

        /**
         * Submit updated item to service
         */
        $scope.submit = function()
        {
            // Update item on service
            Portfolio.update($rootScope.currentPortfolio);
            // Redirect back to grid to see update
            $location.path('/admin/grid/1').replace();
        }

        /**
         * Cancel editing item and return to grid view
         */
        $scope.cancel = function()
        {
            $location.path('/admin/grid/2').replace();
        }

    }])
});