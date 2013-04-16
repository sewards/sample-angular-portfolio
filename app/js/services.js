/**
 * @author Shane Seward
 *
 * Application services
 */
define(['angular','resource'], function (angular, resource) {
	'use strict';
	
	angular.module('myApp.services', ['ngResource'])
    /**
     * Static service
     * Load 'about' section data
     */
    .factory('AboutService', function($resource){
        return $resource('app/data/:id.json', {}, {
            query: {method:'GET', params:{id:'about'}, isArray:false}
        });
    })
    /**
     * Static service
     * Load 'Navigation' data
     */
    .factory('Navigation', function($resource){
        return $resource('app/data/:navId.json', {}, {
            query: {method:'GET', params:{navId:'navigation'}, isArray:true}
        });
    })
    /**
     * Authenticate user for Admin
     */
    .factory('Authentication', function($http, $q, $log){
        var data = [];
        var myService = {};

        myService.login = function(user) {
            var deffered = $q.defer();
            $http.post("/api/authenticate", user)
                .success(function(d) {
                    $log.info("UPDATE SUCCESS "+d);
                    data = d;
                    deffered.resolve();
                });
            return deffered.promise;
        }

        myService.data = function() { return data; };

        return  myService;
    })
    /**
     * Get/Update & Delete work history data
    */
    .factory('Work', function($http, $q, $log) {

        var data = [];
        var myService = {};

        /**
         * Add new work item
         * @param item Item to add
         */
        myService.add = function(item) {
            $http.post('/api/workItem', item)
                .success(function(data) {
                    $log.info("WORK ADDED"+data);
                }).
                error(function(){
                    $log.info("WORK ADD ERROR")
                })
        }

        /**
         * Edit work item
         * @param item Item to edit
         */
        myService.update = function(item) {
            var deffered = $q.defer();
            $log.info("Update ", item._id);
            $http.put("/api/workItem/"+item._id, item)
                .success(function() {
                    $log.info("UPDATE SUCCESS");
                    deffered.resolve();
                });
            return deffered.promise;
        }

        /**
         * Delete work item
         * @param item Item to edit
         */
        myService.delete = function(item) {
            var deffered = $q.defer();
            $log.info("DELETE ", item._id);
            $http.delete("/api/workItem/"+item._id)
                .success(function() {
                    $log.info("DELETE SUCCESS");
                    deffered.resolve();
                });
            return deffered.promise;
        }

        /**
         * Get all work items
         */
        myService.get = function() {
            var deffered = $q.defer();
            $http.get('/api/work')
                .success(function (d) {
                    data = d;
                    console.log(d);
                    deffered.resolve();
                });
            return deffered.promise;
        };
        myService.data = function() { return data; };

        return myService;
    })

    /**
     * Get/Update & Delete portfolio data
     */
    .factory('Portfolio', function($http, $q, $log) {

        var data = [];
        var myService = {};

        /**
         * Add portfolio item
         * @param item Item to add
         */
        myService.add = function(item) {
            $http.post('/api/portfolioItem', item)
                .success(function(data) {
                    $log.info("Portfolio Added"+data);
                }).
                error(function(){
                    $log.info("Portfolio Error")
                })
        }

        /**
         * Update portfolio item
         * @param item  Item to update
         */
        myService.update = function(item) {
            var deffered = $q.defer();
            $log.info("Update ", item._id);
            $http.put("/api/portfolioItem/"+item._id, item)
                .success(function() {
                    $log.info("UPDATE SUCCESS");
                    deffered.resolve();
                });
            return deffered.promise;
        }

        /**
         * Delete portfolio item
         * @param item  Item to delete
         */
        myService.delete = function(item) {
            var deffered = $q.defer();
            $log.info("DELETE ", item._id);
            $http.delete("/api/portfolioItem/"+item._id)
                .success(function() {
                    $log.info("DELETE SUCCESS");
                    deffered.resolve();
                });
            return deffered.promise;
        }

        /**
         * Get all portfolio items
         */
        myService.get = function() {
            var deffered = $q.defer();
            $http.get('/api/portfolio')
                .success(function (d) {
                    data = d;
                    console.log(d);
                    deffered.resolve();
                });
            return deffered.promise;
        };

        /**
         * Get single portfolio item
         * @param id  Id of item to get
         */
        myService.getId = function(id) {
            console.log("getId called/"+id);
            var deffered = $q.defer();
            $http.get('/api/portfolioItem/'+id)
                .success(function (d) {
                    data = d;
                    console.log("D: "+d);
                    deffered.resolve();
                });
            return deffered.promise;
        };

        myService.data = function() { return data; };
        return myService;
    });
});