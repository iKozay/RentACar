const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { validateUserData, validateLoginData } = require("./../middlewares/userValidation");
const User = require("./../models/userModel");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");

const hashPassword = promisify(bcrypt.hash);
const comparePassword = promisify(bcrypt.compare);
const jwtSecret = process.env.JWT_SECRET;

exports.auth_signup = [
  validateUserData,

  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const hashedPassword = await hashPassword(req.body.password, 10);
      const user = new User({
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: hashedPassword,
        email: req.body.email,
        phone_number: req.body.phone_number,
        date_of_birth: req.body.date_of_birth,
        // Assuming the profile picture is optional and may not be provided
        profile_picture: req.body.profile_picture || null,
        role: req.body.role,
      });
      await user.save();

      res.status(201).json(user);
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ error: "duplicate key" });
      } else {
        return res.status(400).json({ error: "Mongodb related error" });
      }
    }
  },
];

exports.auth_login = [
    validateLoginData,
    async(req,res,next)=>{
        try{
            
            const {username,password} = req.body;
            const user = await User.findOne({username});
            if(!user){
                return res.status(401).json({error:"Invalid username"});
              }
        
            const passwordMatch = await comparePassword(password,user.password);
            if(!passwordMatch){
                return res.status(401).json({error:"Invalid password"})
            }
            try{
                const accessToken = jwt.sign(
                    {
                      // These are the fields that i thought would be
                      id: user._id,
                      username: user.username,
                      role: user.role,
                    },
                    jwtSecret,
                    {
                      expiresIn: "2min",
                    }
                  );
                  const refreshToken = jwt.sign(
                    {
                      // This token is stored on the cookies (secured) at the frontend
                      // This token is used in requests from the frontend to generate accessTokens
                      // The difference is that this token is not accessible in the clientSide (stored in the cookie)
                      // so no body can access it from there, and it is used to generate the short-lived access tokens
                      // which are the ones that are required for the backend routes.
            
                      id: user._id,
                      username: user.username,
                      role: user.role,
                    },
                    jwtSecret,
                    {
                      expiresIn: "1hr",
                    }
                  );
            
                  res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: true,
                  });
                  res.status(201).json({ token: accessToken });
              }catch(error){
                return res.status(500).json({error:"error creating JSON WEB TOKENS"})
              }
        }catch(error){
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
]