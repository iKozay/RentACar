const express = require("express");

const { addVehicle,deleteVehicle,getVehicles } = require('../controllers/vehicleController');


const router = express.Router();

router.post("/add",addVehicle);
router.delete("/delete/:id",deleteVehicle);
router.get("/vehicles",getVehicles);


module.exports = router;