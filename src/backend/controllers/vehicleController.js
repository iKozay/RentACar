const Vehicle = require("../models/vehicleModel");

const Branch = require("../models/branchModel");

const {authenticate}=require('../config/passport')

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
const deleteVehicle = [
  authenticate,
  async (req, res) => {
  
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
}];



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

const getCount= async(req,res)=>{
  try {
    const count = await Vehicle.countDocuments({});
    res.json({ count });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getVehiclesByBranchId = async (req, res) => {
  try {
    const { id } = req.params;
    const branch = await Branch.findById(id);

    if (!branch) {
      return res.status(404).json({ messahe: "Branch not found with id " + id })
    }
    const vehicleIds = branch.vehicles;

    const vehicles = await Vehicle.find({ _id: { $in: vehicleIds } });
    
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {getCount, addVehicle, deleteVehicle, getVehicles,getVehicle, updateVehicle ,getVehiclesByBranchId};

