const { body, validationResult } = require('express-validator');

const userValidationRules = () => {
  return [
    body(
      'username',
      'Username must be longer than 5 or mor character!'
    ).isLength({ min: 5 }),
    body(
      'username',
      'Username must contain alphanumeric character!'
    ).isAlphanumeric(),
    body('password', 'Password must be 6 or more characters!').isLength({
      min: 6
    }),
    body('email', 'Invalid email address!').isEmail(),
    body('birthday', 'Date of Birth is required!')
      .not()
      .isEmpty()
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors
  });
};

module.exports = {
  userValidationRules,
  validate
};
