const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const routes = require('./routes');
const cors = require('cors');

const app = express();


// initiating database connection
// const mongoDB = process.env.MONGO_DB;
// main().then(_=>console.log("Successfully connected to mongoDB.")).catch(err=>console.log(err));
// async function main(){
//     await mongoose.connect(mongoDB);
// }

// Initializing middlewares 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// Routers middleware set up
app.use('*',cors());// Enable cross origin resource sharing for all routes 
app.use('/api/users',routes.userRoute);

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
