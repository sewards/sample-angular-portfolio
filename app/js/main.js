/**
 * @author Shane Seward
 *
 * RequireJS starting point
 * Configure and manage all our JS libraries.
 *
 * Whilst Angular takes care of dependency injection,
 * RequireJS is still useful for library management
 */
require.config(
    {
    // Configure library paths and assign an injection reference
	paths: {
		jquery: 'lib/jquery/jquery-1.8.2',
        imagesloaded: 'lib/jquery/jquery.imagesloaded',
		angular: 'lib/angular/angular',
        resource: 'lib/angular/angular-resource',
        bootstrap: 'lib/bootstrap/bootstrap',
        uibootstrap: 'lib/angular/ui-bootstrap-0.1.0',
        ngGrid: 'lib/angular/ng-grid-2.0.2.min',
        isotope: 'lib/jquery/isotope',
        moment: "lib/moment/moment",
        modernizr: 'lib/modernizr/modernizr'
	},

    // Configure root location
	baseUrl: '/app/js',

    // Dependency Shim - Required for non AMD files
	shim: {
		'angular' : {'exports' : 'angular'},
        'resource' : {deps:['angular'], 'exports' : 'resource'},
        'uibootstrap' : {deps:['angular'], 'exports' : 'uibootstrap'},
        'ngGrid' : {deps:['angular'], 'exports' : 'ngGrid'},
		'angularMocks': {deps:['angular'], 'exports':'angular.mock'},
        'imagesloaded' : {deps:['jquery'], 'exports' : 'imagesloaded'},
        'isotope' : {deps:['jquery'], 'exports' : 'isotope'},
        'modernizr' : {deps:['jquery'], 'exports' : 'modernizr'}
	},

    // Load order
	priority: [
		"angular"
	]
});

/**
 * Application bootstrapping
 * Because of RequireJS we need to bootstrap the app app manually.
 * At this point we can also initiate any dependencies.
 */
require( [
	'jquery',
	'angular',
	'app',
	'routes',
    'moment',
    'isotope',
    'imagesloaded'
], function($, angular, app, routes, moment, isotope, imagesloaded, custom) {
	'use strict';
	$(document).ready(function () {
        // Grab html tag
		var $html = $('html');
        // Manually bootstrap Angular to DOM
		angular.bootstrap($html, [app['name']]);
		$html.addClass('ng-app');
        // Initiate Date util library
        moment().format();
	});
});
