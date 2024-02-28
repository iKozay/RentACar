const Vehicle = require("../models/vehicle.model");

const addVehicle = async (req, res) => {

  const car = new Vehicle(req.body);
  try {
    const newVehicle = await car.save();
    res.status(201).json(newVehicle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


module.exports = { addVehicle };