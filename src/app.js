const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./config/db");

const {
  auth,
  users,
  vehicle_brands,
  vehicle_types,
  vehicle_models,
  vehicle_years,
  pricelist,
} = require("./routes/index");

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("listening on port " + port);
});

// router
app.use("/auth", auth);
app.use("/user", users);

app.use("/vehicle-brands", vehicle_brands);
app.use("/vehicle-types", vehicle_types);
app.use("/vehicle-models", vehicle_models);
app.use("/vehicle-years", vehicle_years);
app.use("/vehicle-pricelists", pricelist);

module.exports = app;
