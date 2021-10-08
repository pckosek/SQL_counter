#!/usr/bin/nodejs

// initialize express and app class object
var express = require('express')
var app = express();

// initialize handlebars templating engine
var hbs = require('hbs')
app.set('view engine', 'hbs')

var mysql = require('mysql');


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

    var sql = "SELECT full_name,gpa FROM puppies";

    pool.query(sql, function(error, results, fields){
        if (error) throw error;
        console.log(results)
        res.render('puppy', {'student_data':results} );
    }) 
    
})

app.get('/form', function(req,res){
    res.render('puppyform')
})

app.get('/getpuppy', function(req,res){

    var name = req.query.full_name;
    var sql = "SELECT full_name,gpa FROM puppies WHERE full_name=?";
    
    pool.query(sql, [name], function(error, results, fields){
        if (error) throw error;
        res.render('puppy', {'student_data':results} );
    }) 
})

app.get('/makepuppy', function(req,res){

    var name = req.query.full_name;
    var sql = "INSERT INTO puppies(full_name) VALUES(?);";
    
    pool.query(sql, [name], function(error, results, fields){
        if (error) throw error;
        res.redirect('https://user.tjhsst.edu/pckosek/');
    }) 
})





// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
});