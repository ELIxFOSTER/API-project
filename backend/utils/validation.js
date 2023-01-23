const { validationResult } = require('express-validator');
const { check } = require('express-validator')
// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errObj = {}
    const errors = validationErrors
      .array()
      .map((error) => (errObj[error.param] =`${error.msg}`));

    const err = Error('Validation Error');
    err.errors = errObj;
    err.status = 400;
    err.title = 'Bad request.';
    next(err);
  }
  next();
};


//* Create a Spot Validation
const validateSpotCreation = [
  check('address')
  .exists({ checkFalsy: true })
  .withMessage('Street address is required'),
  check('city')
  .exists({ checkFalsy : true })
  .withMessage('City is required'),
  check('state')
  .exists({ checkFalsy: true })
  .withMessage('State is required'),
  // check("lat")
  // .isFloat()
  // .withMessage("Latitude is not valid"),
  // check("lng")
  // .isFloat()
  // .withMessage("Longitude is not valid"),
  check('country')
  .exists({ checkFalsy: true })
  .withMessage('Country is required'),
  check('name')
  .exists({ checkFalsy: true })
  .withMessage('Name is required')
  .bail()
  .isLength({ max: 50 })
  .withMessage('Name must be less than 50 characters long'),
  check('description')
  .exists({ checkFalsy: true })
  .withMessage('Description is required'),
  check('price')
		.exists()
		.withMessage('Price per day is required')
		.bail()
		.isInt({ min: 1 })
		.withMessage('Price must be greater than 0'),
  handleValidationErrors
]

module.exports = {
  handleValidationErrors,
  validateSpotCreation
};
