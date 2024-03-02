const mongoose = require('mongoose');


const { app } = require("../app");

require("dotenv").config();

const connect_db = async () => {
  try {
    let dbUrl = process.env.MONGO_DB;
    const conn = await mongoose.connect(dbUrl, {
      useUnifiedTopology: true,
    });

    console.log("mongodb connected");

   
  } catch (err) {
    console.log(err);
    app.close();
    process.exit(1);
  }
};

const disconnect_db = async () => {
  try {
    await mongoose.connection.close();
   
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = {  connect_db, disconnect_db };