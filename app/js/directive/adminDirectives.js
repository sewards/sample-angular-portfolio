/**
 * @author Shane Seward
 *
 * Administration section directives
 * Re-usable components and DOM manipulation
 */
define(['angular',
    '../services',
    'jquery',
    'isotope',
    'imagesloaded'],
    function(angular,
             services,
             $,
             isotope,
             imagesloaded)
    {

      // Force strict coding
    'use strict';

    // Create our Angular module
    angular.module('myApp.adminDirectives', ['myApp.services'])

    /**
     * Admin sub navigation
     */
    .directive('subNav', function () {
        return {
            restrict:'A',
            scope:{
                current:'=current'
            },
            templateUrl:'/app/partials/subNav.html',
            controller:function ($scope, $log) {
                // Scope properties
                $scope.subnav = [
                    {label:"Work History", link:"/admin/grid/1"},
                    {label:"Portfolio", link:"/admin/grid/2"}
                ];

                if ($scope.current) {
                    $scope.subnav[$scope.current - 1].selected = true;
                }
            }
        };
    })
    /**
     * Work history admin grid
     * View, Add and edit work items
     */
        .directive('workAdminGrid',[
                    "Work",
                    "$location",
                    "$rootScope",
                    function (Work,
                              $location,
                              $rootScope)
        {
        return {
            restrict:'A',
            templateUrl:'/app/partials/admin-grid.html',
            controller:function ($scope,
                                 $rootScope,
                                 $log,
                                 Work) {

                // Root properties
                $rootScope.pagetitle = "Admin Work History";

                // Scope properties
                $scope.mySelections = [];
                $scope.myData = $rootScope.work;
                $scope.gridOptions = {
                    data:'myData',
                    selectedItems:$scope.mySelections,
                    multiSelect:false,
                    columnDefs:[
                        {field:'client', displayName:'Client'},
                        {field:'start', width:100, displayName:'Start'},
                        {field:'end', width:100, displayName:'End'},
                        {field:'edit', width:40, displayName:' ', cellTemplate:'<div class="adminButtonContainer"><button class="btn btn-mini btn-warning" ng-click="editRow(row.entity)"><i class="icon-edit icon-white"></i></button></div>'},
                        {field:'delete', width:40, displayName:' ', cellTemplate:'<div class="adminButtonContainer"><button class="btn btn-mini btn-danger" ng-click="deleteRow(row.entity)"><i class="icon-remove icon-white"></button></div>'}
                    ]
                };

                /**
                 *  Add new work item
                 */
                $scope.addNew = function () {
                    // Relocate to Add work
                    $location.path('/admin/addWork').replace();
                }

                /**
                 * Edit work item
                 * @param rowData selected work item
                 */
                $scope.editRow = function (rowData) {
                    // Store work item on root
                    $rootScope.currentWork = rowData;
                    // Relocate to Edit work item
                    $location.path('/admin/editWork').replace();
                }

                /**
                 *  Delete work item
                 * @param rowData selected work item
                 */
                $scope.deleteRow = function (rowData) {
                   // We need a delay for the grid to have selected the new row
                    setTimeout(function(){
                        // Delete row on Service
                        Work.delete($scope.mySelections[0]).then(function () {
                            $scope.$safeApply($scope);
                            $scope.initGrid();
                        });
                    },500)
                }
            }
        }
    }])
    /**
     * Portfolio admin grid
     * View, Add and edit portfolio items
     */
        .directive('portfolioAdminGrid', [
                    "Portfolio",
                    "$location",
                    "$rootScope",
                    function (Portfolio,
                              $location,
                              $rootScope)
    {
        return {
            restrict:'A',
            templateUrl:'/app/partials/admin-grid.html',
            controller:function ($scope, $log, Portfolio) {

                // Root properties
                $rootScope.pagetitle = "Admin Portfolio";

                // Scope properties
                $scope.mySelections = [];
                $scope.myData = $rootScope.portfolio;
                $scope.gridOptions = {
                    data:'myData',
                    selectedItems:$scope.mySelections,
                    multiSelect:false,
                    columnDefs:[
                        {field:'title', displayName:'Project'},
                        {field:'client', displayName:'Client'},
                        {field:'start', width:100, displayName:'Start'},
                        {field:'end', width:100, displayName:'End'},
                        {field:'edit', width:40, displayName:' ', cellTemplate:'<div class="adminButtonContainer"><button class="btn btn-mini btn-warning" ng-click="editRow(row.entity)"><i class="icon-edit icon-white"></i></button></div>'},
                        {field:'delete', width:40, displayName:' ', cellTemplate:'<div class="adminButtonContainer"><button class="btn btn-mini btn-danger" ng-click="deleteRow(row.entity)"><i class="icon-remove icon-white"></button></div>'}
                    ]
                };

                /**
                 *  Add new portfolio item
                 */
                $scope.addNew = function () {
                    // Relocate to add item
                    $location.path('/admin/addPortfolio').replace();
                }

                /**
                 * Edit existing portfolio item
                 * @param rowData Selected portfolio item
                 */
                $scope.editRow = function (rowData) {
                   // Store selection on root
                    $rootScope.currentPortfolio = rowData;
                    // Redirect to edit view
                    $location.path('/admin/editPortfolio').replace();
                }

                /**
                 * Delete existing portfolio item
                 * @param rowData Selected portfolio item
                 */
                $scope.deleteRow = function (rowData) {
                    // Delay needed to alow grid to select row
                    setTimeout(function(){
                        // Delete item with service
                        Portfolio.delete($scope.mySelections[0]).then(function () {
                            $scope.$safeApply($scope);
                            $scope.initGrid();
                        });
                    },500)
                }
            }
        }
    }]);
});

