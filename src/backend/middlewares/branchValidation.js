const { body } = require('express-validator');

const validateBranchData = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Branch name is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('Branch name must be between 3 and 50 characters'),
  body('location.postal_code')
    .trim()
    .notEmpty()
    .withMessage('Postal code is required')
    .isLength({ min: 5, max: 10 })
    .withMessage('Postal code must be between 5 and 10 characters'),
  body('location.city')
    .trim()
    .notEmpty()
    .withMessage('City is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('City must be between 3 and 50 characters'),
  body('location.province')
    .trim()
    .notEmpty()
    .withMessage('Province is required'),
  body('location.street')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Street address cannot be more than 100 characters'),
];
module.exports = { validateBranchData };
