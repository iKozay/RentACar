const usersRoute= require('./usersRoute');
const vehiclesRoute =require('./vehiclesRoute');
const reservationsRoute =require('./reservationsRoute');
const authRoute = require('./authRoute');
const branchRoute = require('./branchRoute');
const transactionsRoute = require('./transactionsRoute');

module.exports = {
  authRoute,
  usersRoute,
  vehiclesRoute,
  reservationsRoute,
  branchRoute,
  transactionsRoute
};
