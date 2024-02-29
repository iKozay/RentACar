const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const {promisify} = require('util');
const hashPassword = promisify(bcrypt.hash);
const mongoose = require('mongoose');

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
    body("first_name")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isAlpha()
    .withMessage("First name can only contain alphabetic characters")
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters"),
  body("last_name")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isAlpha()
    .withMessage("First name can only contain alphabetic characters")
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
    )
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .not()
    .matches(/^.*(.)\1{2,}.*$/)
    .withMessage(
      "Password cannot contain repeating characters more than twice"
    ),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email address is required")
    .isEmail()
    .withMessage("Enter a valid email")
    .normalizeEmail(),
  body("phone_number")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^\+(?:[0-9] ?){6,14}[0-9]$/)
    .withMessage("Enter a valid phone number"),
  body("date_of_birth")
    .trim()
    .notEmpty()
    .withMessage("Date of birth is required")
    .isISO8601()
    .withMessage("Enter a valid date in ISO 8601 format (YYYY-MM-DD)"),
  body("profile_picture")
    .optional()
    .isURL()
    .withMessage("Enter a valid URL")
    .custom(async (value) => {
      try {
        const response = await fetch(value, { method: "HEAD" });
        if (!response.ok) {
          throw new Error("Profile picture URL is not accessible");
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.startsWith("image/")) {
          throw new Error("Profile picture URL must point to an image");
        }
        return true;
      } catch (error) {
        throw new Error("Error validating profile picture URL");
      }
    }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    try{
    await hashPassword(req.body.password, 10);
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
 
  }
  catch(error){
    // if (error.name==='MongoError') 
   
      if (error.code === 11000) {
        res.status(400).json({"error":"duplicate key"})
      } else {
        res.status(400).json({"error":"Mongodb related error"})
      }
    // Other errors
    res.status(500).json({ error: "Internal Server Error" });
  }
}),
];
