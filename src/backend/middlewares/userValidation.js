const { body } = require('express-validator');

const validateUserData = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters')
    .isLength({ max: 30 })
    .withMessage('Username cannot be more than 30 characters'),
  body('first_name')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isAlpha()
    .withMessage('First name can only contain alphabetic characters')
    .isLength({ min: 3 })
    .withMessage('First name must be at least 3 characters')
    .isLength({ max: 30 })
    .withMessage('First name cannot be more than 30 characters'),
  body('last_name')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isAlpha()
    .withMessage('Last name can only contain alphabetic characters')
    .isLength({ min: 3 })
    .withMessage('Last name must be at least 3 characters')
    .isLength({ max: 30 })
    .withMessage('Last name cannot be more than 30 characters'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email address is required')
    .isEmail()
    .withMessage('Enter a valid email')
    .normalizeEmail(),
  body('phone_number')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^\+?(?:[0-9] ?){6,14}[0-9]$/)
    .withMessage('Enter a valid phone number'),
  body('date_of_birth')
    .trim()
    .notEmpty()
    .withMessage('Date of birth is required')
    .isISO8601()
    .withMessage('Enter a valid date in ISO 8601 format (YYYY-MM-DD)'),
  body('profile_picture')
    .optional()
    .isURL()
    .withMessage('Enter a valid URL')
    .custom(async (value) => {
      try {
        const response = await fetch(value, { method: 'HEAD' });
        if (!response.ok) {
          throw new Error('Profile picture URL is not accessible');
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.startsWith('image/')) {
          throw new Error('Profile picture URL must point to an image');
        }
        return true;
      } catch (error) {
        throw new Error('Error validating profile picture URL');
      }
    }),
  body('role')
    .optional()
    .custom((value, { req }) => {
      if (!value) {
        req.body.role = 'customer'; // role is customer by default
      }
      return true;
    })
    .isIn(['customer', 'admin', 'representative'])
    .withMessage(
      "Invalid role. Role must be one of 'customer', 'admin', or 'representative'",
    ),
];

const validateUpdateUserData = [
  body('username')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters')
    .isLength({ max: 30 })
    .withMessage('Username cannot be more than 30 characters'),
  body('first_name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isAlpha()
    .withMessage('First name can only contain alphabetic characters')
    .isLength({ min: 3 })
    .withMessage('First name must be at least 3 characters')
    .isLength({ max: 30 })
    .withMessage('First name cannot be more than 30 characters'),
  body('last_name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isAlpha()
    .withMessage('Last name can only contain alphabetic characters')
    .isLength({ min: 3 })
    .withMessage('Last name must be at least 3 characters')
    .isLength({ max: 30 })
    .withMessage('Last name cannot be more than 30 characters'),
  body('password')
    .optional()
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'), // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
  // )
  // .withMessage(
  //   "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  // )

  body('email')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Email address is required')
    .isEmail()
    .withMessage('Enter a valid email')
    .normalizeEmail(),
  body('phone_number')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^\+?(?:[0-9] ?){6,14}[0-9]$/)
    .withMessage('Enter a valid phone number'),
  body('date_of_birth')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Date of birth is required')
    .isISO8601()
    .withMessage('Enter a valid date in ISO 8601 format (YYYY-MM-DD)'),
  body('profile_picture')
    .optional()
    .isURL()
    .withMessage('Enter a valid URL')
    .custom(async (value) => {
      try {
        const response = await fetch(value, { method: 'HEAD' });
        if (!response.ok) {
          throw new Error('Profile picture URL is not accessible');
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.startsWith('image/')) {
          throw new Error('Profile picture URL must point to an image');
        }
        return true;
      } catch (error) {
        throw new Error('Error validating profile picture URL');
      }
    }),
  body('role')
    .optional()
    .custom((value, { req }) => {
      if (!value) {
        req.body.role = 'customer'; // role is customer by default
      }
      return true;
    })
    .isIn(['customer', 'admin', 'representative'])
    .withMessage(
      "Invalid role. Role must be one of 'customer', 'admin', or 'representative'",
    ),
];

const validateLoginData = [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('password').trim().notEmpty().withMessage('Password is required'),
];

module.exports = {
  validateUserData,
  validateLoginData,
  validateUpdateUserData,
};
