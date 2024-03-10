const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");
const hashPassword = promisify(bcrypt.hash);
const mongoose = require("mongoose");
const {validateUserData} = require('./../middlewares/userValidation');
const { authenticate } = require("./../config/passport");
exports.user_list = [ 
  authenticate,// Authenticating the user
  asyncHandler(async (req, res, next) => {
  // if(req.user.role!='admin') // only admins

  //   return res.status(401).json({error:'unauthorized'})

  const users = await User.find({}).sort({ last_name: 1 }).exec();
  res.status(200).json(users || []);
})];
exports.user_detail = [
  authenticate,
  asyncHandler(async (req, res) => {
    if(req.user.role!='admin')

      return res.status(401).json({error:'unauthorized'})



  const userId = req.params.userId;
  const user = await User.findById(userId).exec();
  if (user === null) {
    res.status(404).json({ error: "User doesn't exist" });
  }
  res.status(200).json(user);
})
];

exports.customer_list = [
  authenticate,
  asyncHandler(async (req, res) => {
    if (req.user.role !== 'admin') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const customers = await User.find({ role: 'customer' }).exec();
    res.status(200).json(customers);
  })
];


exports.user_create = [
  authenticate,
  validateUserData,
  asyncHandler(async (req, res, next) => {
    if(req.user.role!='admin')


      return res.status(401).json({error:'unauthorized'})

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const hashedPassword = await hashPassword(req.body.password, 10);
      const user = new User({
        username:req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: hashedPassword,
        email: req.body.email,
        phone_number: req.body.phone_number,
        date_of_birth: req.body.date_of_birth,
        // Assuming the profile picture is optional and may not be provided
        profile_picture: req.body.profile_picture || null,
        role:req.body.role
      });
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ error: "duplicate key" });
      } else {
        return res.status(400).json({ error: "Mongodb related error" });
      }
      // Other errors
      res.status(500).json({ error: "Internal Server Error" });
    }
  }),
];

exports.user_update = [
  authenticate,
  validateUserData,

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const hashedPassword = await hashPassword(req.body.password, 10);
      const updates = new User({
        _id:req.params.userId,
        username:req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: hashedPassword,
        email: req.body.email,
        phone_number: req.body.phone_number,
        date_of_birth: req.body.date_of_birth,
        // Assuming the profile picture is optional and may not be provided
        profile_picture: req.body.profile_picture || null,
        role:req.body.role
      });
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        updates,
        {new: true}
      );
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ error: "duplicate key" });
      } else {
        return res.status(400).json({ error: "Mongodb related error"});
      }
      // Other errors
      res.status(500).json({ error: "Internal Server Error" });
    }
  }),
];

exports.user_delete = asyncHandler(async (req,res,next) => {
    const userId = req.params.userId;
    try{
      const deletedUser = await User.findByIdAndDelete(userId,{new: true});
      if(!deletedUser){
        return res.status(400).json({error:"User doesn't exist"});
      }
      res.status(200).json({ message: "User deleted successfully", deletedUser });
    }
    catch(error){
      if (error.code === 11000) {
        return res.status(400).json({ error: "duplicate key" });
      } else {
        return res.status(400).json({ error: "Mongodb related error"});
      }
    }
})