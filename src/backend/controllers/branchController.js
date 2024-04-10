const { validationResult } = require('express-validator');
const Branch = require('../models/branchModel');
const { authenticate } = require('../config/passport');
const { validateBranchData } = require('../middlewares/branchValidation');
const getGeocodeFromAddress = require('../utils/getGeocodeFromAddress');
const Vehicle = require('../models/vehicleModel');
const Reservation = require('../models/reservationModel');

exports.branch_list = [

  async (req, res) => {
    try {
      const branches = await Branch.find({}).sort({ name: 1 }).exec();
      res.status(200).json(branches);
    } catch (error) {
      console.log(`Error${error}`);
      res.status(500).json({ error: 'MongoDB server Error' });
    }
  },
];
exports.branch_detail = [

  async (req, res) => {
    try {
      const branch = await Branch.findById(req.params.branchId).populate('vehicles reservations').exec();
      if (branch === null) {
        res
          .status(400)
          .json({ error: `branch ${req.params.branchId} doesn't exist` });
      }
      res.status(200).json(branch);
    } catch (error) {
      console.log(`Error${error}`);
      res.status(500).json({ error: 'MongoDB server Error' });
    }
  },
];
exports.branch_create = [
  authenticate,
  validateBranchData,
  async (req, res) => {
    if (req.user.role != 'admin') return res.status(401).json({ error: 'unauthorized' });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const branch = new Branch({
      name: req.body.name,
      location: {
        postal_code: req.body.location.postal_code,
        city: req.body.location.city,
        province: req.body.location.province,
        street: req.body.location.street,
      },
      vehicles: req.body.vehicles || [],
      reservations: req.body.reservations || [],
    });
    try {
      const location = await getGeocodeFromAddress(branch.address);
      if (!location) return res.status(400).json({ error: 'Address in not findable in the map' });
      branch.location.lat = location.lat;
      branch.location.lon = location.lon;
      await branch.save();
      res.status(201).json(branch);
    } catch (error) {
      console.error('Error creating branch:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
];

exports.branch_update = [
  authenticate,
  async (req, res) => {
    try {
      const id = req.params.branchId; // Extract the branch ID from the request parameters
      console.log(id);
      // Extract all fields from the request body
      const {
        name, location, vehicles, reservations,
      } = req.body;

      // Construct the update object
      const updateObj = {};
      if (name) {
        updateObj.$set = { name };
      }
      if (location) {
        const loc = await getGeocodeFromAddress(`${location.street}, ${location.city}, ${location.province}`);
        if (!loc) return res.status(400).json({ error: 'Address in not findable in the map' });
        location.lat = loc.lat;
        location.lon = loc.lon;
        updateObj.$set = { ...updateObj.$set, location }; // Update $set with location object
      }
      if (vehicles) {
        updateObj.$set = { ...updateObj.$set, vehicles }; // Update $set with vehicles array
      }
      if (reservations) {
        updateObj.$set = { ...updateObj.$set, reservations }; // Update $set with reservations array
      }

      // Update the branch by ID with the constructed update object
      const updatedBranch = await Branch.findByIdAndUpdate(
        id,
        updateObj,
        { new: true }, // To return the updated document
      );

      if (!updatedBranch) {
        return res.status(404).json({ message: 'Branch not found' });
      }

      // Respond with the updated branch data
      res.status(200).json(updatedBranch);
    } catch (error) {
      console.error('Error updating branch:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
];

exports.branch_append_reservation = [

  async (req, res) => {
    try {
      const { branchId } = req.params; // Extract the branch ID from the request parameters
      const { reservationId } = req.body; // Extract the reservation ID from the request body

      // Check if both branchId and reservationId are provided
      if (!branchId || !reservationId) {
        return res.status(400).json({ error: 'Branch ID or Reservation ID is missing' });
      }

      // Find the branch by ID
      const branch = await Branch.findById(branchId);

      // Check if the branch exists
      if (!branch) {
        return res.status(404).json({ error: 'Branch not found' });
      }

      // Append the reservationId to the reservations array of the branch
      branch.reservations.push(reservationId);

      // Save the updated branch
      const updatedBranch = await branch.save();

      // Respond with the updated branch data
      res.status(200).json(updatedBranch);
    } catch (error) {
      console.error('Error appending reservation to branch:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
];

exports.branch_append_vehicle = [

  async (req, res) => {
    try {
      const { branchId } = req.params; // Extract the branch ID from the request parameters
      const { vehicleId } = req.body; // Extract the reservation ID from the request body

      // Check if both branchId and reservationId are provided
      if (!branchId || !vehicleId) {
        return res.status(400).json({ error: 'Branch ID or Reservation ID is missing' });
      }

      // Find the branch by ID
      const branch = await Branch.findById(branchId);

      // Check if the branch exists
      if (!branch) {
        return res.status(404).json({ error: 'Branch not found' });
      }

      // Append the reservationId to the reservations array of the branch
      branch.vehicles.push(vehicleId);

      // Save the updated branch
      const updatedBranch = await branch.save();

      // Respond with the updated branch data
      res.status(200).json(updatedBranch);
    } catch (error) {
      console.error('Error appending reservation to branch:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
];

exports.branch_count = async (req, res) => {
  try {
    const count = await Branch.countDocuments({});
    res.json({ count });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.branch_delete = [
  authenticate,
  async (req, res) => {
    const id = req.params.branchId;
    try {
      const deleted = await Branch.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ error: 'No branch was found with the passed ID' });
      }
      res.status(200).json({ message: `Successfully deleted branch ${id}` });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },
];

exports.branch_refresh = async (req, res) => {
  const id = req.params.branchId;

  try {
    const branch = await Branch.findById(id);

    if (!branch) {
      return res.status(404).json({ error: 'Branch not found' });
    }

    let modified = false;

    // Check vehicles
    const vehicleExistenceChecks = branch.vehicles.map(async (vehicleId) => {
      const vehicleExists = await Vehicle.exists({ _id: vehicleId });
      if (!vehicleExists) {
        modified = true;
        return false; // Mark for removal
      }
      return true;
    });

    // Check reservations
    const reservationExistenceChecks = branch.reservations.map(async (reservationId) => {
      const reservationExists = await Reservation.exists({ _id: reservationId });
      if (!reservationExists) {
        modified = true;
        return false; // Mark for removal
      }
      return true;
    });

    // Await all existence checks
    const [vehicleResults, reservationResults] = await Promise.all([
      Promise.all(vehicleExistenceChecks),
      Promise.all(reservationExistenceChecks),
    ]);

    // Update vehicles and reservations arrays
    branch.vehicles = branch.vehicles.filter((_, index) => vehicleResults[index]);
    branch.reservations = branch.reservations.filter((_, index) => reservationResults[index]);

    // If any changes were made, update the branch document
    if (modified) {
      await branch.save();
    }

    res.status(200).json({ message: 'Branch refreshed successfully' });
  } catch (error) {
    console.error('Error refreshing branch:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
