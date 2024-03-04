const express = require("express");

const { addVehicle, deleteVehicle } = require('../controllers/vehicleController');


const router = express.Router();

router.post("/add",addVehicle);

// delete route
router.delete("/delete/:id",deleteVehicle);






module.exports = router;