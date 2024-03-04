const express = require("express");


const { addVehicle,deleteVehicle,getVehicles ,getVehicle} = require('../controllers/vehicleController');


const router = express.Router();

router.post("/add",addVehicle);
router.delete("/delete/:id",deleteVehicle);
router.get("/vehicles",getVehicles);
router.get("/vehicle/:id",getVehicle);

// delete route
router.delete("/delete/:id",deleteVehicle);






module.exports = router;