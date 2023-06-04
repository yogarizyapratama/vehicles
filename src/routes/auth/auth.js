const express = require("express");
const { body } = require("express-validator");
const controller = require("../../controllers/auth/auth");
const JWT = require("../../middleware/authentication");

const router = express.Router();

router.post(
  "/login",
  [
    body("email").notEmpty().isEmail(),
    body("password").notEmpty().isLength({ min: 6 }),
  ],
  controller.Login
);
router.post(
  "/register",
  [
    body("name").notEmpty().isString(),
    body("email").notEmpty().isEmail(),
    body("is_admin").notEmpty().isBoolean(),
    body("password").notEmpty().isLength({ min: 6 }),
  ],
  controller.Register
);

module.exports = router;
