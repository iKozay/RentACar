const express = require("express");

const { addVehicle } = require('../controllers/vehicle.controller');


const router = express.Router();

router.post("/add",addVehicle);


module.exports = router;
