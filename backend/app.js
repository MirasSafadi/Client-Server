import { isNewSessionRequired, isAuthRequired, generateJWTToken, verifyToken } from './common/authUtils';
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require("./routes/testAPI");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(async (req, res, next) => {
  var apiUrl = req.originalUrl;
  var httpMethod = req.method;
  req.session = {};
  
  if (isNewSessionRequired(httpMethod, apiUrl)) {
    req.newSessionRequired = true;
  } else if (isAuthRequired(httpMethod, apiUrl)) {
    let authHeader = req.header('Authorization');
    let sessionID = authHeader.split(' ')[1];
    if (sessionID) {
      let userData = verifyToken(sessionID);
      if (userData) {
        req.session.userData = userData;
        req.session.sessionID = sessionID;
      }
      else {
        return res.status(401).send({
          ok: false,
          error: {
            reason: "Invalid Sessiontoken",
            code: 401
          }
        });
      }
    } else {
      return res.status(401).send({
        ok: false,
        error: {
          reason: "Missing Sessiontoken",
          code: 401
        }
      });
    }
  }
  next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/testAPI", testAPIRouter);



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
