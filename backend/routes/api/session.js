const express = require("express");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Email or username is required"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required"),
  handleValidationErrors,
];

const router = express.Router();

//* Log in
router.post("/", validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.login({ credential, password });

  if (!user) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    return next(err);
  }

  const token = await setTokenCookie(res, user);

  const resObj = {}
  resObj.id = user.id
  resObj.firstName = user.firstName
  resObj.lastName = user.lastName
  resObj.email = user.email
  resObj.username = user.username


  return res.json({
    user: resObj
  });
});

//* Log out
router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

//* Restore session user
router.get("/", restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
   let resObj = {}
   resObj.id = user.id
   resObj.firstName = user.firstName
   resObj.lastName = user.lastName
   resObj.email = user.email
   resObj.username = user.username

   return res.json({
    user: resObj
   })
  } else return res.json({ user: null });
});

module.exports = router;
