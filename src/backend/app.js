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
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true
};
app.use(cors(corsOptions));

app.use('*',cors(corsOptions));// Enable cross origin resource sharing for all routes 
app.use(passport.initialize);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Replace with your React app's origin
  res.header('Access-Control-Allow-Credentials', 'true'); // Allow credentials (cookies)
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/api/users',routes.usersRoute);
app.use('/api/vehicles',routes.vehiclesRoute);
app.use('/api/auth',routes.authRoute);
app.use('/api/reservations',routes.reservationsRoute);
app.use('/api/branches',routes.branchRoute);
app.use('/api/transactions',routes.transactionsRoute);
app.use('/api/reviews',routes.reviewsRoute);



app.get('/test/fetch',(req,res)=>{// Just for testing purposes
  res.sendFile(path.join(__dirname,"/public/fetch.html"));
})


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
