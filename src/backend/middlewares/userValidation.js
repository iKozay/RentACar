const { body} = require("express-validator");
const validateUserData = 
[
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
      })
    ];

module.exports = {
    validateUserData
}