const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),

    handleValidationErrors
  ];

//* Sign up
router.post(
    '/',
    validateSignup,
    async (req, res, next) => {
      const { email, password, username, firstName, lastName } = req.body;

      let checkEmail = await User.findOne({
        where: {
          email: email
        }
      })

      let checkUsername = await User.findOne({
        where: {
          username: username
        }
      })

      if (checkEmail) {
        const error = Error('User already exists')
        error.errors = { email: 'User with that email already exists' }
        error.status = 403
        next(error)
      }

      if (checkUsername) {
        const error = Error('User already exists')
        error.errors = { username: 'User with that username already exists' }
        error.status = 403
        next(error)
      }



      const user = await User.signup({ email, username, password, firstName, lastName });

      const token = await setTokenCookie(res, user);



      return res.json({
        user,
        token
      });

    }
  );

module.exports = router;
