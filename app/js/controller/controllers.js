/**
 * @author Shane Seward
 *
 * Main application controllers
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
              imagesloaded)
    {
        // Force strict coding
	    'use strict';
	
	return angular.module('myApp.controllers', ['myApp.services'])

    /**
     * Root application controller
     * Manages Navigation and initiates root methods
     */
    .controller('AppCtrl',
                    ['$scope',
                    '$rootScope',
                    '$location',
                    'Navigation',
                    'AboutService',
                    'Portfolio',
                    'Work',
                    '$route',
                    function (
                        $scope,
                        $rootScope,
                        $location,
                        Navigation,
                        AboutService,
                        Portfolio,
                        Work,
                        $route)
    {
        // Root Propertires
        $rootScope.user = {username:"",password:""};
        $rootScope.pagetitle = "";
        $rootScope.navigationLoaded = false;
        $rootScope.aboutLoaded = false;
        $rootScope.workLoaded = false;
        $rootScope.portfolioLoaded = false;

        // Load our navigation data
        $rootScope.navigation = Navigation.query({},function(){
            $rootScope.navigationLoaded = true;
        });

        // Load about data
        $rootScope.about = AboutService.query({},function(){
            $rootScope.aboutLoaded = true;
        });

        // Load work data
        Work.get().then(function() {
            $rootScope.workLoaded = true;
            $rootScope.work = Work.data();
        });

        // Load portfolio data
        Portfolio.get().then(function() {
            $rootScope.portfolio = Portfolio.data();
            $rootScope.portfolioLoaded = true;
        });

        /**
         * Got detail page for item
         * @param item Object containing item.order
         */
        $rootScope.detail = function(item)
        {
            $location.path("/detail/"+item.order);
        }

        /**
         * Route change hgandler.
         */
        $rootScope.$on("$routeChangeStart",function(event, next, current){
            var id = $location.path().split('/')[1];
            $scope.selectId(id);
        })

        /**
         * Set slection on navidation data
         * @param id Selected id
         */
        $scope.selectId = function(id)
        {
            if(!$scope.navigation || !id) return;

            if(id.length==0) id = $scope.navigation[0].id;
            angular.forEach($scope.navigation, function(item){
                item.selected = (item.id == id) ? true : false;
            })
        }
    }])

    /**
     *   Welcome controller
     */
    .controller('WelcomeCtrl',
                ['$scope',
                 '$rootScope',
                 '$routeParams',
                 function ($scope,
                           $rootScope,
                           $routeParams)
    {
        // Root Propertires
        $rootScope.pagetitle = "Welcome";

        // Scope Propertires
        $rootScope.videos = [];
        $rootScope.videoItem;
        $scope.orderProp = 'order';

        // Format videos
        $scope.formatVideos = function()
        {
            console.log("FORMAT VIDEOS");
            $rootScope.portfolio.forEach(function(item){
                if(item.video.length>0)
                {
                    $scope.videos.push({data:item, selected:false});
                }
            })
            if($scope.videos.length>0)
                $scope.selectVideo($scope.videos[0]);
        }

        $scope.selectVideo = function(activeVideo) {
            $scope.videos.forEach(function(video){
                video.selected = false;
            })
            activeVideo.selected = true;
            $scope.videoItem =  activeVideo.data;

        }

        // If portfolio data loaded format videos
        if($rootScope.portfolioLoaded){ $scope.formatVideos(); }
        else { setTimeout($scope.formatVideos, 500); }

        }])

    /**
     *   About controller
     */
    .controller('AboutCtrl', ['$scope',
                                '$rootScope',
                                function ($scope,
                                          $rootScope)
    {
        // Root Propertires
        $rootScope.pagetitle = "About";
        // Scope Propertires
        $scope.attId = 'awards';
        $scope.orderProp = 'order';
    }])

    /**
     *   Portfolio controller
     */
        // Portfolio controller
    .controller('PortfolioCtrl', ['$scope',
                                  '$rootScope',
                                    function ($scope,
                                              $rootScope)
    {
        $rootScope.pagetitle = "Portfolio";

    }])
    /**
     *   Portfolio Detail controller
     */
    .controller('DetailCtrl', ['$scope',
                                '$rootScope',
                                '$routeParams',
                                'Portfolio',
                                '$timeout',
                                '$window',
                                function ($scope,
                                          $rootScope,
                                         $routeParams,
                                          Portfolio,
                                          $timeout,
                                          $window)
    {
        // Root Propertires
        $rootScope.pagetitle = "Portfolio Item";
        // Scope Propertires
        $scope.orderProp = 'order';
        $scope.itemId = $routeParams.id;
        $scope.imageId = "";
        $scope.video = "";
        $scope.videos = [];
        $scope.showVideo = false;
        $scope.thumbs = [];
        $scope.portfolioItem;

        /**
         * Return to previous location
         */
        $scope.return = function()
        {
            $window.history.back();
        }

        /**
         * Select image thumbnail
         * @param activeThumb
         */
        $scope.selectThumb = function(activeThumb)
        {
            $scope.thumbs.forEach(function(thumb){
                thumb.selected = false;
            })
            activeThumb.selected = true;
            $scope.imageId =  activeThumb.imageId;
        }

        /**
         * Configure detail item data
         * @param item
         */
        $scope.configureItem = function(item)
        {
            $scope.portfolioItem = item;
            $scope.video = $scope.portfolioItem.video;
            $scope.showVideo = ($scope.video.length>0) ? true : false;

            $scope.portfolioItem.image.forEach(function(item){
                $scope.thumbs.push({imageId:item, selected:false})
            })
            $scope.selectThumb($scope.thumbs[0]);
        }

        /**
         * Find detail in Array
         * Only used for local static (non database) data
         */
        $scope.locateDetail = function()
        {
            $scope.portfolio.forEach(function(item){
                if(item.order == $scope.itemId)
                {
                   $scope.configureItem(item);
                }
            });
        }

        if($rootScope.portfolioLoaded) { $scope.locateDetail() }
        else { $timeout($scope.locateDetail,200) }


        /*
         Portfolio.getId($routeParams.id).then(function() {
         $scope.configureItem(Portfolio.data());
         });
         */
    }])

});