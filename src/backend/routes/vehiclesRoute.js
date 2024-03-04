const express = require("express");

const { addVehicle,deleteVehicle,getVehicles } = require('../controllers/vehicleController');


const router = express.Router();

router.post("/add",addVehicle);


module.exports = router;