const Branch = require("../models/branchModel");
const { validationResult } = require("express-validator");
const { authenticate } = require("./../config/passport");
const { validateBranchData } = require("./../middlewares/branchValidation");
const getGeocodeFromAddress=require('./../utils/getGeocodeFromAddress'); 
exports.branch_list = [

  async (req, res) => {
    try {
      const branches = await Branch.find({}).sort({ name: 1 }).exec();
      res.status(200).json(branches);
    } catch (error) {
      console.log("Error" + error);
      res.status(500).json({ error: "MongoDB server Error" });
    }
  },
];
exports.branch_detail = [

  async (req, res) => {
    try {
      const branch = await Branch.findById(req.params.branchId).populate('vehicles reservations').exec();
      if (branch === null)
        res
          .status(400)
          .json({ error: "branch " + req.params.branchId + " doesn't exist" });
      res.status(200).json(branch);
    } catch (error) {
      console.log("Error" + error);
      res.status(500).json({ error: "MongoDB server Error" });
    }
  },
];
exports.branch_create = [
 authenticate,
  validateBranchData,
  async (req, res) => {
    if (req.user.role != "admin")
      return res.status(401).json({ error: "unauthorized" });

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
      reservations:req.body.reservations || []
    });
    try {
      const location = await getGeocodeFromAddress(branch.address);
      if (!location) return res.status(400).json({ error: "Address in not findable in the map" });
      branch.location.lat=location.lat;
      branch.location.lon=location.lon;
      await branch.save();
      res.status(201).json(branch);
    } catch (error) {
      console.error("Error creating branch:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
];
exports.branch_count= async(req,res)=>{
  try {
    const count = await Branch.countDocuments({});
    res.json({ count });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}