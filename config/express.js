'use strict';

// var config = require('./config');
var mongoose = require('./mongoose');
// var ps = require('./passport');
var passport = require('passport');
var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');


var app = express();
var db = mongoose();
// var passport = ps();
require('./passport')(passport);


// view engine setup
app.set('views', path.join(__dirname, '../app/views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
  secret: 'tut',
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({
    mongooseConnection: db.connection
  })

}));
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static('./public'));
// app.use(express.static(path.join(__dirname, 'public')));


require('../app/routes/index.server.routes')(app, passport);
require('../app/routes/users.server.routes')(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;