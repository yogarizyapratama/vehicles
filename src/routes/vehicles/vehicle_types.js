const express = require("express");
const { body } = require("express-validator");
const controller = require("../../controllers/vehicles/vehicle_types");
const JWT = require("../../middleware/authentication");
const Check = require("../../middleware/check_admin");

const router = express.Router();

router.get("/", controller.GET);
router.get("/:id", controller.GETBYID);
router.post(
  "/",
  [body("name").notEmpty(), body("brand_id").notEmpty()],
  JWT.VerifyToken,
  Check.checkAdmin,
  controller.CREATE
);
router.patch(
  "/:id",
  [body("name").notEmpty(), body("brand_id").notEmpty()],
  JWT.VerifyToken,
  Check.checkAdmin,
  controller.UPDATE
);
router.delete("/:id", JWT.VerifyToken, Check.checkAdmin, controller.DELETE);

module.exports = router;
