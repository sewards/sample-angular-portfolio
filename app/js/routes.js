/**
 * @author Shane Seward
 *
 * Application routes
 */
define(['angular', 'app'], function(angular, app)
{
    // Force strict coding
    'use strict';
    return app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
            templateUrl: '/app/partials/welcome.html',
            controller: 'WelcomeCtrl'
        });
        $routeProvider.when('/unsupported', {
            templateUrl: '/app/partials/unsupported.html',
            controller: 'UnsupportedCtrl'
        });
        $routeProvider.when('/welcome', {
            templateUrl: '/app/partials/welcome.html',
            controller: 'WelcomeCtrl'
        });
        $routeProvider.when('/about', {
            templateUrl: '/app/partials/about.html',
            controller: 'AboutCtrl'
        });
        $routeProvider.when('/portfolio', {
            templateUrl: '/app/partials/portfolio-list.html',
            controller: 'PortfolioCtrl'
        });
        $routeProvider.when('/work', {
            templateUrl: '/app/partials/work-list.html',
            controller: 'WorkCtrl'
        });
        $routeProvider.when('/login', {
            templateUrl: '/app/partials/login.html',
            controller: 'LoginCtrl'
        });
        $routeProvider.when('/admin/grid/:grid', {
            templateUrl: '/app/partials/admin.html',
            controller: 'AdminCtrl'
        });
        $routeProvider.when('/admin/addPortfolio', {
            templateUrl: '/app/partials/addPortfolioTemplate.html',
            controller: 'AddPortfolioCtrl'
        });
        $routeProvider.when('/admin/addWork', {
            templateUrl: '/app/partials/addWorkTemplate.html',
            controller: 'AddWorkCtrl'
        });
        $routeProvider.when('/admin/editWork', {
            templateUrl: '/app/partials/addWorkTemplate.html',
            controller: 'EditWorkCtrl'
        });
        $routeProvider.when('/admin/editPortfolio', {
            templateUrl: '/app/partials/addPortfolioTemplate.html',
            controller: 'EditPortfolioCtrl'
        });
        $routeProvider.when('/detail/:id', {
            templateUrl: '/app/partials/detail.html',
            controller: 'DetailCtrl'
        });
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix = '!';
    }]);

});