'use strict';

// Module dependencies.
var application_root = __dirname,
    express = require( 'express' ), //Web framework
    path = require( 'path' ), //Utilities for dealing with file paths
    mongoose = require( 'mongoose' ); //MongoDB integration

//Create server
var app = express.createServer();

//Connect to database
mongoose.connect( 'mongodb://localhost/seward_database' );

//Schemas
var PortfolioItem = new mongoose.Schema({
    image:  Array,
    title:     String,
    start:     String,
    end:     String,
    client:    String,
    clientLink:     String,
    role:     String,
    tech:    String,
    body:    String,
    tags:    String,
    video: String,
    summary: String,
    awards:  Array
});

var WorkItem = new mongoose.Schema({
    logo:  String,
    start:     String,
    end:     String,
    client:     String,
    clientLink:     String,
    role:     String,
    type:    String,
    summary:    String,
    body:     String
});

//Models
var PortfolioItemModel = mongoose.model( 'PortfolioItem', PortfolioItem );
var WorkItemModel = mongoose.model( 'WorkItem', WorkItem );

// Configure server
app.configure( function() {
    //parses request body and populates request.body
    app.use( express.bodyParser() );

    //checks request.body for HTTP method overrides
    app.use( express.methodOverride() );

    //perform route lookup based on url and HTTP method
    app.use( app.router );

    //Where to serve static content
    app.use( express.static( path.join( application_root, '/') ) );

    //Show all errors in development
    app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
});

//Routes
app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});
// Routes
app.get( '/api', function( request, response ) {
    response.send( 'Shane Seward API is running' );
});

/*********************************************************
 * AUTHENTICATE
 *********************************************************/

//Insert a new  portfolio item
app.post( '/api/authenticate', function( request, response ) {
    console.log( '/api/authenticate called' );
    return false;
});

/*********************************************************
 * WORK
 *********************************************************/

//Get a list of all portfolio items
app.get( '/api/work', function( request, response ) {
    return WorkItemModel.find( function( err, work ) {
        console.log("/api/work called ")
        if( !err ) {
            console.log("SERVER SUCCESS")
            return response.send( work );
        } else {
            console.log("SERVER ERROR")
            return console.log( err );
        }
    });
});

//Get a  work item
app.get( '/api/workItem/:id', function( request, response ) {
    console.log( 'Updating workItem_ ' + request.body.logo );
    return WorkItemModel.findById( request.params.id, function( err, workItem )
    {
        if( !err ) {
            console.log("SERVER SUCCESS")
            return response.send( workItem );
        } else {
            console.log("SERVER ERROR")
            return console.log( err );
        }
    });
});

//Insert a new  portfolio item
app.post( '/api/workItem', function( request, response ) {
    console.log( '/api/workItem called' );
    var workItem = new WorkItemModel({
        logo:  request.body.logo,
        start:     request.body.start,
        end:     request.body.end,
        client:    request.body.client,
        clientLink:      request.body.clientLink,
        role:     request.body.role,
        summary:     request.body.summary,
        type:    request.body.type,
        body:    request.body.body
    });
    workItem.save( function( err ) {
        if( !err ) {
            return console.log( 'workItem created' );
        } else {
            return console.log( err );
        }
    });
    return response.send( workItem );
});

//Update a  portfolio item
app.put( '/api/workItem/:id', function( request, response ) {
    console.log( 'Updating workItem_ ' + request.body.logo );
    return WorkItemModel.findById( request.params.id, function( err, workItem )
    {
        workItem.logo =  request.body.logo,
            workItem.start = request.body.start,
            workItem.end = request.body.end,
            workItem.client = request.body.client,
            workItem.clientLink = request.body.clientLink,
            workItem.role = request.body.role,
            workItem.summary = request.body.summary,
            workItem.type = request.body.type,
            workItem.body = request.body.body


        return workItem.save( function( err ) {
            if( !err ) {
                console.log( 'workItem updated' );
            } else {
                console.log( err );
            }
            return response.send( workItem );
        });
    });
});

//Delete a  portfolio item
app.delete( '/api/workItem/:id', function( request, response ) {
    console.log( 'Deleting workItem with id: ' + request.params.id );
    return WorkItemModel.findById( request.params.id, function( err, workItem ) {
        return workItem.remove( function( err ) {
            if( !err ) {
                console.log( 'workItem removed' );
                return response.send( '' );
            } else {
                console.log( err );
            }
        });
    });
});

/*********************************************************
 * PORTFOLIO
 *********************************************************/

//Get a list of all portfolio items
app.get( '/api/portfolio', function( request, response ) {
    return PortfolioItemModel.find( function( err, portfolio ) {
        console.log("/api/portfolio called ")
        if( !err ) {
            console.log("SERVER SUCCESS")
            return response.send( portfolio );
        } else {
            console.log("SERVER ERROR")
            return console.log( err );
        }
    });
});

//Get a  work item
app.get( '/api/portfolioItem/:id', function( request, response ) {
    console.log( 'Getting portfolioItem_ '+request.params.id);
    return PortfolioItemModel.findById( request.params.id, function( err, portfolioItem )
    {
        if( !err ) {
            console.log("SERVER SUCCESS",portfolioItem)
            return response.send( portfolioItem );
        } else {
            console.log("SERVER ERROR")
            return console.log( err );
        }
    });
});

//Insert a new  portfolio item
app.post( '/api/portfolioItem', function( request, response ) {
    console.log( '/api/portfolioItem called' );
    var portfolioItem = new PortfolioItemModel({
        image:  request.body.image,
        title:      request.body.title,
        start:     request.body.start,
        end:     request.body.end,
        client:    request.body.client,
        clientLink:      request.body.clientLink,
        role:     request.body.role,
        tech:     request.body.tech,
        body:    request.body.body,
        tags:    request.body.tags,
        video:    request.body.video,
        summary:    request.body.summary,
        awards: request.body.awards
    });
    portfolioItem.save( function( err ) {
        if( !err ) {
            return console.log( 'portfolioItem created' );
        } else {
            return console.log( err );
        }
    });
    return response.send( portfolioItem );
});

//Update a  portfolio item
app.put( '/api/portfolioItem/:id', function( request, response ) {
    console.log( 'Updating portfolioItem ' + request.body.id );
    return PhoneItemModel.findById( request.params.id, function( err, portfolioItem ) {
        portfolioItem.image =  request.body.image,
            portfolioItem.title = request.body.title,
            portfolioItem.start = request.body.start,
            portfolioItem.end = request.body.end,
            portfolioItem.client = request.body.client,
            portfolioItem.clientLink = request.body.clientLink,
            portfolioItem.role = request.body.role,
            portfolioItem.tech = request.body.tech,
            portfolioItem.body = request.body.body,
            portfolioItem.tags = request.body.tags,
            portfolioItem.video = request.body.video,
            portfolioItem.summary = request.body.summary,
            portfolioItem.awards= request.body.awards


        return portfolioItem.save( function( err ) {
            if( !err ) {
                console.log( 'portfolioItem updated' );
            } else {
                console.log( err );
            }
            return response.send( portfolioItem );
        });
    });
});

//Delete a  portfolio item
app.delete( '/api/portfolioItem/:id', function( request, response ) {
    console.log( 'Deleting portfolioItem with id: ' + request.params.id );
    return PortfolioItemModel.findById( request.params.id, function( err, portfolioItem ) {
        return portfolioItem.remove( function( err ) {
            if( !err ) {
                console.log( 'portfolioItem removed' );
                return response.send( '' );
            } else {
                console.log( err );
            }
        });
    });
});




//Start server
var port = 4711;
app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});
