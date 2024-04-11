const express = require('express');

const {
  getVehiclesByBranchId,
  // deleteVehicles,
  addVehicle,
  deleteVehicle,
  getVehicles,
  getCount,
  getVehicle,
  updateVehicle,
} = require('../controllers/vehicleController');

const router = express.Router();

router.post('/add', addVehicle);
router.delete('/delete/:id', deleteVehicle);
router.get('/vehicles', getVehicles);
router.get('/vehicle/:id', getVehicle);
router.get('/branch/vehicles/:id', getVehiclesByBranchId);

// delete route
router.delete('/delete/:id', deleteVehicle);

// router.delete("/delete",deleteVehicles);
// update vehicle
router.put('/update/:id', updateVehicle);

router.get('/count', getCount);

module.exports = router;
