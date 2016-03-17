var express = require('express');
var app = express();
var path = require('path');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var backend =  require('./routes/backend/backend');
var frontend =  require('./routes/frontend/frontend');

var port = process.env.PORT || 8010;
process.env.NODE_PATH =  path.join( __dirname + "/") ;
process.env.UPLOAD_PATH =  path.join( __dirname + "/uploads/") ;


console.log( 'process.env.NODE_PATH :',process.env.NODE_PATH);

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); 
app.use(express.static( path.join(__dirname + '/app')));

app.use('/bower_components',  express.static(path.join(__dirname + '/bower_components')));
app.use("/uploads", express.static(__dirname + '/uploads'));

app.use('/admin', backend);  //accessing /admin will get you to route backend
app.use('/admin', express.static(__dirname + '/app/backend') ); //go to static directoy backend while accessing /admin from url

app.use('/', frontend); //accessing / will get you to frontend route
app.use('/', express.static(__dirname + '/app/frontend') ); //go to static directoy fronend while accessing / from url

app.set('views', __dirname + '/views');
app.set('view engine','ejs');
app.set('view cache', false);

app.listen(port, function(){
	console.log('listening @ port : ' + port);
});

