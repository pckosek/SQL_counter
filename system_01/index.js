#!/usr/bin/nodejs

// initialize express and app class object
var express = require('express')
var app = express();

// initialize handlebars templating engine
var hbs = require('hbs')
app.set('view engine', 'hbs')

var express = require('express');
var app = express();
var mysql = require('mysql');

var hbs = require('hbs')


app.set('view engine', 'hbs');



// -------------- mysql initialization -------------- //
// USE PARAMETERS FROM DIRECTOR DOCS!!!
var sql_params = {
  connectionLimit : 10,
  user            : process.env.DIRECTOR_DATABASE_USERNAME,
  password        : process.env.DIRECTOR_DATABASE_PASSWORD,
  host            : process.env.DIRECTOR_DATABASE_HOST,
  port            : process.env.DIRECTOR_DATABASE_PORT,
  database        : process.env.DIRECTOR_DATABASE_NAME
}

var pool  = mysql.createPool(sql_params);

// -------------- express 'get' handlers -------------- //


app.get('/', function(req,res){

    var sql = 'UPDATE pagevisits SET count=count+1;'
    
    pool.query(sql, function(error, results, fields){
        if (error) throw error;
        res.render('page_counter');
    }) 
    
})



// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
});
