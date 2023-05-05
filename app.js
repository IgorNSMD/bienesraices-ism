var createError = require('http-errors');
var express = require('express');
var csrf = require('csurf');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { format } = require("date-fns");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var userController = require('./controllers/UserController.js');
var propertieController = require('./controllers/PropertieController.js')

// var AppRoutes = require('./routes/AppRoutes.js')
// var ApiRoutes = require( './routes/ApiRoutes.js')

var db = require('./config/db.js');

async function getDb() { 
  //conexión a la la bd
  try {
    await db.authenticate();
    db.sync();
    console.log('conexión correcta a la bd...')
  } catch (error) {
    console.log(error)
  }

}

//getDb();


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Habilitar CSRF
app.use( csrf({cookie: true}) )

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/', userController);
app.use('/', propertieController);

app.locals.format = format;

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
