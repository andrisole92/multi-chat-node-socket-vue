
//var express = require('express');
//var mongoose  = require('mongoose');
//var fallback = require('express-history-api-fallback');
//var connect = require('connect');
//var app = express();
//var root = __dirname + './';
//
//app.use(express.static(root));
//app.use(fallback(__dirname + './index.html'));
//
//
//
//
//var http = require('http').Server(app);
//var io = require('socket.io')(http);
//mongoose.connect('mongodb://andrisole92:bayazeth1@ds141128.mlab.com:41128/heroku_fwpj43xj');
//var db_conn = mongoose.connection;
//var db = require('./db')(db_conn,mongoose,io);
//var sockets = require('./sockets')(io);
//
//
//
//
//app.use('/dist', express.static('dist'));
//app.use(express.static('./dist'));
//
//app.get('*', function(req, res){
//    res.sendFile(__dirname + '/index.html');
//});
//
//http.listen(3000, function(){
//    console.log('listening on *:3000');
//});

var requirejs = require('requirejs');

requirejs.config({
    baseUrl: './www_server',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        //app: 'www_server'
    },
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require
});

requirejs(['app','io','http','socket.io','db'],function(app, io, http, socketio,db) {
    console.log("index.js module loaded");
    //app.listen(3000);
});