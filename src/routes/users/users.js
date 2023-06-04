const express = require("express");
const { body } = require("express-validator");
const controller = require("../../controllers/users/users");

const router = express.Router();

router.get("/users", controller.Users);
router.get("/:id", controller.UserById);
router.patch("/:id", controller.UpdateUser);
router.delete("/:id", controller.DeleteUser);

module.exports = router;
