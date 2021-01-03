var crypto = require('crypto');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');

var app = express();

// passport setup
require('./auth')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: crypto.randomBytes(64).toString('hex'),
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: 'strict'
  }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// render login page with optional error message
app.get('/login', function (req, res, next) {
  const msg = req.flash('error');
  res.render('login', {
    title: 'Login',
    error: msg[0]
  });
});

// handle login request
app.post('/login',
  passport.authenticate('local',
    {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    }
  )
);

// From here on, all routes need authorization:
app.use(function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  else
    res.redirect('/login')
});

// routes
app.use('/', require('./routes/index'));

// Call req.logout() to log out
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
