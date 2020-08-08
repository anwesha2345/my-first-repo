var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const exphbs = require("express-handlebars");
var expressValidator = require('express-validator');
const session = require('express-session');
var hbs = require('express-handlebars');
var passport = require('passport');
var crypto = require('crypto');

const Handlebars = require('handlebars');
var handlebars = require("handlebars"),
  layouts = require("handlebars-layouts");
handlebars.registerHelper(layouts(handlebars));
var socket  = require('socket.io');

var test = require('./routes/test');

const { mongoose } = require('./db.js');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const cors = require('cors')
const angularapi = require("./routes/angularapi");
const productRouter = require("./routes/angularapi");
var app = express();
const port = process.env.PORT || 3200;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.engine('handlebars',exphbs({
  extname: 'hbs',
  defaultLayout: 'dashboard',
  layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir  : [
        path.join(__dirname, 'views/partials'),
    ]
}))
//app.use(expressValidator());
const allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // intercept OPTIONS method
  if ("OPTIONS" == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
};
app.use(allowCrossDomain);
app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
//app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api' , test);
app.use(usersRouter);
app.use(cors({origin: 'http://localhost:4200'}));
app.use(angularapi);
app.use('/product', passport.authenticate('jwt', { session: false }), productRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});




app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
        maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    }
  //cookie: { secure: true }
}))


require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    next();
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

let server = app.listen(port, () => console.log(`Server listening to port ${port}`));

var io = socket(server);
io.on('connection', function(socket){
 
  socket.on("chat", function(data){
    io.sockets.emit("chat",data);
  });

  socket.on("typing", function(data){
    socket.broadcast.emit("typing", data);
  });
})



module.exports = app;
