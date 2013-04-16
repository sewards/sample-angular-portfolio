/**
 * @author Shane Seward
 *
 * Main application directives.
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

    angular.module('myApp.directives', ['myApp.services'])

    /**
     *  Manages page resizing.
     *  Listens to window.resize event and manipulates DOM
     */
    .directive('pageResize', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs)
            {
                // Listen to resize event of window
                $(window).bind("resize", handleResize);

                /**
                 * Manipulate the DOM after resize
                 * @param e
                 */
                function handleResize(e) {
                    var winHeight = $(window).height();
                    var winWidth = $(window).width();
                    if (winWidth < 980 && winWidth > 767) {
                        if($("#wall").width()) {
                            if($(".item").hasClass("span3")) {
                                $(".item").removeClass("span3");
                                $(".item").addClass("span4");
                            }
                        }
                        if($(".lr-page").hasClass("span4 offset4")) {
                            $(".lr-page").removeClass("span4 offset4");
                            $(".lr-page").addClass("span6 offset3");
                            $("#page-title").removeClass("span4 offset4");
                            $("#page-title").addClass("span6 offset3");
                        }

                    } else {

                        if($("#wall").width()) {
                            if($(".item").hasClass("span4")) {
                                $(".item").removeClass("span4");
                                $(".item").addClass("span3");
                            }
                        }
                        if($(".lr-page").hasClass("span6 offset3")) {
                            $(".lr-page").removeClass("span6 offset3");
                            $(".lr-page").addClass("span4 offset4");
                            $("#page-title").removeClass("span6 offset3");
                            $("#page-title").addClass("span4 offset4");
                        }
                    }
                }
            }
        }
    })

    /**
     *  Floating portfolio wall using Jquery Isotope plugin.
     */
    .directive('portfolioWall', function(){
        return {
            restrict: 'A',
            replace: true,
            transclude: false,
            scope: {  },
            templateUrl: "/app/partials/portfolio-list-wall.html",
            controller:function ($scope,
                                 $log,
                                 Portfolio,
                                 $rootScope)
            {

                // Scope properties
                $scope.orderProp = 'order';
                $scope.filters = [
                    {label:"All", value:"*", selected:true},
                    {label:"HTML5", value:".html5", selected:false},
                    {label:"Flex", value:".flex", selected:false},
                    {label:"Flash", value:".flash", selected:false},
                    {label:"Mobile", value:".mobile", selected:false},
                    {label:"Banking", value:".banking", selected:false},
                    {label:"Media", value:".newmedia", selected:false},
                    {label:"Awards", value:".awards", selected:false}
                ];
                Portfolio.get().then(function() {
                    $scope.portfolio = Portfolio.data();
                    setTimeout(function(){
                        $scope.wall.imagesLoaded(function() {
                            console.log("IMAGES LOADED");
                            setTimeout($scope.formatIsotope, 400);
                        });
                    }, 100);
                });

                /**
                 * Launch portfolio detail
                 * @param item Portfolio data
                 * @param e DOM event
                 */
                $scope.detail = function(item,e)
                {
                   $rootScope.detail(item);
                }

                /**
                 * Set selected filter and manipulate Isotope plugin
                 * @param filter Selected filter
                 */
                $scope.setFilter = function(filter)
                {
                    $scope.filters.forEach(function(item){
                        item.selected = false;
                    })
                    filter.selected = true;

                    $scope.wall.isotope( {filter:filter.value} );
                }

                /**
                 *  Format the Isotope plugin
                 */
                $scope.formatIsotope = function(){
                    $scope.wall.css("visibility", "visible");
                    // initialize Isotope
                    $scope.wall.isotope({
                        // options...
                        resizable: false, // disable normal resizing
                        // set columnWidth to a percentage of container width
                        masonry: { columnWidth: $scope.wall.width() / 12 }
                    });

                    // update columnWidth on window resize
                    $(window).smartresize(function(){
                        $scope.wall.isotope({
                            masonry: { columnWidth: $scope.wall.width() / 12 }
                        });
                    });

                    $scope.wall.isotope({
                        itemSelector : '.item'
                    });
                }
            },
            // The linking function will add behavior to the template
            link: function(scope, element, attrs)
            {
                // Capture DOM objects
                scope.wall = $("#wall");
                scope.wall.css("visibility", "hidden");
            }
        }
    })

    /**
     *  Animating progress bar
     */
    .directive('progressItem', function(){
        return {
            restrict: 'A',
            replace: true,
            transclude: false,
            scope: { percentage:'@percentage' },
            template: '<li class="progressOverlay">'+
                            '<div class="meter"><span></span></div>'+
                       '</li>',
            // The linking function will add behavior to the template
            link: function(scope, element, attrs)
            {
                // Capture DOM elements
                scope.bar = $(element).find("span");

                // Listen for data change and initiate animation
                scope.$watch(scope.data, function() {
                    scope.bar.width(0);
                    scope.bar.animate({
                        width:scope.percentage + "%"
                    },1200)
                })
            }
        }
    })

    /**
     *  Animating back to top
     */
    .directive('backToTop', function () {
        return {
            restrict:'A',
            scope:{},
            link: function(scope, element, attrs)
            {
                // Capture DOM element
                var aTag = angular.element(element);
                // Listent to click event on element
                aTag.bind('click', handleClick);

                /**
                 * Handle element click event
                 * Animate page to top
                 * @param e DOM event
                 */
                function handleClick(e) {
                    e.preventDefault();
                    $('html, body').animate({scrollTop:0}, 300);
                }
            }
        };
    });


});

