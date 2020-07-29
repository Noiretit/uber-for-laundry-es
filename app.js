require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');


const session = require('express-session'); //IT-2
const MongoStore = require('connect-mongo')(session); //IT-2

mongoose
  .connect('mongodb://localhost/uber-for-laundry', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth'); //IT-1
const laundryRouter = require('./routes/laundry'); //IT-4

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Middleware Setup

app.use(logger('dev'));
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ //IT-2 - middleware
  secret: "never do your own laundry again",
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 60000
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 //1 día
  })
}));

//IT-2: Antes de que sucedan las rutas, este middleware verifica si hay una sesión. Si hay, setea algunos locals en la respuesta para que la vista acceda. 
//Ese middleware facilita la personalización de la homepage para los usuarios logueados. ¡Hagámoslo ahora!
app.use((req, res, next) => {
  /*
  isUserLoggedIn: un booleano que indica si hay un usuario conectado o no.
currentUserInfo: la información del usuario de la sesión (solo disponible si ha iniciado sesión).
*/
  if (req.session.currentUser) {
    res.locals.currentUserInfo = req.session.currentUser;
    res.locals.isUserLoggedIn = true;
  } else {
    res.locals.isUserLoggedIn = false;
  }

  next();
});

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.use('/', indexRouter);
app.use('/', authRouter); //IT-1
app.use('/', laundryRouter); //IT-4

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