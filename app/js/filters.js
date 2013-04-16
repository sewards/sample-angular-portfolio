/**
 * @author Shane Seward
 *
 * Application filters
 */
define(['angular', 'services', 'moment'], function (angular, services, moment) {

    // Force strict coding
    'use strict';

    // Create filter module
	angular.module('myApp.filters', ['myApp.services'])

    /**
     * Format date string
     *
     * @param input Item object containing 'start' and 'end' dates
     */
    .filter('formatDate', function() {
        return function(input) {
            if(!input) return "";

            var start = moment(input.start, "YYYY MM").format("MMMM YYYY");
            var end = (input.end.toLowerCase() == "present") ? "Present" : moment(input.end, "YYYY MM").format("MMMM YYYY");
            return start + " - " + end;
        };
    })

    /**
     * Format logo image url
     *
     * @param input Item object containing 'tech'
     */
    .filter('formatLogo', function() {
        return function(input) {
            if(!input) return "";

            return "/app/img/logo/"+ input.tech.toLowerCase()+".jpg"
        };
    })

    /**
     *  Start from filter for use in paginated lists
     *
     *  @param input Array
     *  @param start Starting point in list
     */
    .filter('startFrom', function() {
        return function(input, start) {
            if(!input || !start) return;
            start = +start; //parse to int
            return input.slice(start);
        }
    })

    /**
     *  Return filtered list ot items containing required data
     *
     *  @param input Array
     *  @param attId Required property
     */
    .filter('haveAttribute', function() {
        return function(input,attId) {
            if(!input ) return;
            var awards = [];
            for (var i = 0; i < input.length; i++) {
                 if(input[i][attId]){
                    if(input[i][attId].length>0)
                    {
                        awards.push(input[i]);
                    }
                }
            }
            return awards;
        }
    });
});
