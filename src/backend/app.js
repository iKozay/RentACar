const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { connect_db } = require("./mongo_conn");


const app = express();


// Loading the environment variables from the .env file.
require("dotenv").config();




app.use(cors());

// Parsing the body to json
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

const port = process.env.PORT || 5001;


app.use(express.json());





// Router listening for root and responding with  Comptan real estate
app.get("/", (req, res) => {
  res.send("GazaBrigade");
});

connect_db()
  .then(() => {
  
      app.listen(port, console.log(`Server started on port ${port}`));


  })
  .catch((err) => {
    console.log(err);
  });

module.exports = { app };