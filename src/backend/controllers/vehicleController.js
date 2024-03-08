const Vehicle = require("../models/vehicleModel");

const addVehicle = async (req, res) => {

  const car = new Vehicle(req.body);
  try {
    const newVehicle = await car.save();
    res.status(201).json(newVehicle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ Availability: { $ne: "Not In Stock" } });
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return res.status(404).json({ messahe: "Vehicle not found with id " + id })
    }
    res.status(200).json(vehicle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



/**
 * Deletes vehicle from the database
 * and return the deleted vehicle
 */
const deleteVehicle = async (req, res) => {

  console.log("delete");
  try {
    const { id } = req.params;

    const vehicle = await Vehicle.findByIdAndDelete(id);
    if (!vehicle) {
      return res.status(404).json({ message: "Cannot find any vehicle with id " + id + " to delete." })
    }
    res.status(200).json(vehicle);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
}



/**
 * Updates vehicle from the database
 * and return the updated vehicle
 */
const updateVehicle = async (req, res) => {

  console.log("update");
  try {
    const { id } = req.params;

    const vehicle = await Vehicle.findByIdAndUpdate(id,{...req.body});
    if (!vehicle) {
      return res.status(404).json({ message: "Cannot find any vehicle with id " + id + " to update." })
    }

    const uvehicle = await Vehicle.findById(id);
    if (!uvehicle) {
      return res.status(404).json({ messahe: "Vehicle not found with id " + id })
    }
    res.status(200).json(uvehicle);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
}



module.exports = { addVehicle, deleteVehicle, getVehicles,getVehicle, updateVehicle };

