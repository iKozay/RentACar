const express = require('express');
const createError = require('http-errors'); // this module is required in the error handling middleware below
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');
require('dotenv').config();
const routes = require('./routes');
const passport = require('./config/passport');

const cors = require('cors');
const app = express();


// initiating database connection
// const mongoDB = process.env.MONGO_DB;
// main().then(_=>console.log("Successfully connected to mongoDB.")).catch(err=>console.log(err));
// async function main(){
//     await mongoose.connect(mongoDB);
// }

// Initializing middlewares 

app.use(session({
  secret:process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




// app.use(passport.initialize());
// Routers middleware set up
app.use('*',cors());// Enable cross origin resource sharing for all routes 
app.use(passport.initialize);
app.use('/api/users',routes.usersRoute);

app.get('/test/fetch',(req,res)=>{// Just for testing purposes
  res.sendFile(path.join(__dirname,"/public/fetch.html"));
})
app.use('/api/vehicles',routes.vehiclesRoute);
app.use('/api/auth',routes.authRoute);

// Error handling middleware functions (for standard error returns)
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // send JSON error response
    res.status(err.status || 500).json({ error: err.message });
  });


module.exports = app;
