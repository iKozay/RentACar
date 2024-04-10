const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const {
  validateUserData,
  validateLoginData,
} = require('../middlewares/userValidation');
const User = require('../models/userModel');
const { authenticate } = require('../config/passport');

const hashPassword = promisify(bcrypt.hash);
const comparePassword = promisify(bcrypt.compare);
const jwtSecret = process.env.JWT_SECRET;

exports.auth_signup = [
  validateUserData,

  async (req, res) => {
    console.log(req.body);
    try {
      const errors = validationResult(req);
      console.log(errors);
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

      return res.status(201).json(user);
    } catch (error) {
      if (error.code === 11000) {
        console.log(error);
        return res.status(405).json({ error: 'duplicate key' });
      }
      return res.status(500).json({ error: 'Mongodb related error' });
    }
  },
];

exports.auth_login = [
  validateLoginData,
  async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ error: 'Invalid username' });
      }

      const passwordMatch = await comparePassword(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }
      // req.user = {
      //     id: user._id,
      //     username: user.username,
      //     role: user.role
      // };
      try {
        const accessToken = jwt.sign(
          {
            // These are the fields that i thought would be
            id: user._id,
            username: user.username,
            role: user.role,
          },
          jwtSecret,
          {
            expiresIn: '1hr',
          },
        );
        const refreshToken = jwt.sign(
          {
            // This token is stored on the cookies (secured) at the frontend
            // This token is used in requests from the frontend to generate accessTokens
            // The difference is that this token is not accessible in the clientSide
            // (stored in the cookie)
            // so no body can access it from there, and it is used to generate the short-lived
            // access tokens
            // which are the ones that are required for the backend routes.

            id: user._id,
            username: user.username,
            role: user.role,
          },
          jwtSecret,
          {
            expiresIn: '1hr',
          },
        );

        res.cookie('refreshToken', refreshToken, {
          origin: 'http://localhost:5173',
          httpOnly: true,
          secure: true,
          // sameSite:"none"
        });
        return res.status(201).json({ token: accessToken });
      } catch (error) {
        return res
          .status(501)
          .json({ error: 'error creating JSON Web Tokens' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
];

exports.auth_refreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token not provided' });
  }

  try {
    const decoded = jwt.verify(refreshToken, jwtSecret);

    if (!decoded) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    const { id, username, role } = decoded;
    const accessToken = jwt.sign(
      {
        id,
        username,
        role,
      },
      jwtSecret,
      {
        expiresIn: '30sec',
      },
    );

    return res.status(200).json({ token: accessToken });
  } catch (error) {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
};

exports.auth_checkToken = [
  authenticate, (req, res) => {
    res.status(201).json({ message: 'valid token' });
  },
];
exports.auth_logout = [
  // authenticate,
  (req, res) => {
    try {
      // res.clearCookie("refreshToken");

      return req.session.destroy((err) => {
        if (err) {
          return res.status(501).json({ error: 'Error destroying session' });
        }
        // If there's no error, respond with a success message
        return res.status(200).json({ message: 'Logout successfully' });
      });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
];
