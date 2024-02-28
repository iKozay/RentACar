const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/users");
const bcrpyt = require("bcryptjs");

exports.user_list = asyncHandler(async (req, res, next) => {
  const users = await User.find({}).sort({ last_name: 1 }).exec();
  res.status(200).json(users || []);
});
exports.user_detail = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId).exec();
  if (user === null) {
    res.status(404).json({ error: "User doesn't exist" });
  }
  res.status(200).json(user);
});

exports.user_create = [
 
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    bcrpyt.hash(req.body.password, 10, async (err, hashPassword) => {
      if (err) {
        return next(err);
      }
      const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: hashPassword,
        email: req.body.email,
        phone_number: req.body.phone_number,
        date_of_birth: req.body.date_of_birth,
        // Assuming the profile picture is optional and may not be provided
        profile_picture: req.body.profile_picture || null,
      });
      await user.save();
      res.status(201).json(user);
    });
  }),
];
