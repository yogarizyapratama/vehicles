const express = require("express");
const { body } = require("express-validator");
const controller = require("../../controllers/vehicles/pricelist");
const JWT = require("../../middleware/authentication");
const Check = require("../../middleware/check_admin");

const router = express.Router();

router.get("/", controller.GET);
router.get("/:id", controller.GETBYID);
router.post(
  "/",
  [
    body("price").notEmpty(),
    body("year_id").notEmpty(),
    body("model_id").notEmpty(),
  ],
  JWT.VerifyToken,
  Check.checkAdmin,
  controller.CREATE
);
router.patch(
  "/:id",
  [
    body("price").notEmpty(),
    body("year_id").notEmpty(),
    body("model_id").notEmpty(),
  ],
  JWT.VerifyToken,
  Check.checkAdmin,
  controller.UPDATE
);
router.delete("/:id", JWT.VerifyToken, Check.checkAdmin, controller.DELETE);

module.exports = router;
