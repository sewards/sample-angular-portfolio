/**
 * @author Shane Seward
 *
 * Create Main application and
 * inject all application modules
 */
define([
	'angular',
	'filters',
	'services',
	'directive/directives',
    'directive/adminDirectives',
	'controller/controllers',
    'controller/adminControllers',
    'uibootstrap',
    'ngGrid'
	],
    function (angular,
                 filters,
                 services,
                 directives,
                 adminDirectives,
                 controllers,
                 adminControllers,
                 uibootstrap,
                 ngGrid)
{
        // Force strict coding
		'use strict';

        // Create our application
		return angular.module('myApp', ['myApp.controllers',
                                        'myApp.adminControllers',
                                        'myApp.filters',
                                        'myApp.services',
                                        'myApp.directives',
                                        'myApp.adminDirectives',
                                        'ui.bootstrap',
                                        'ngGrid']);
});
