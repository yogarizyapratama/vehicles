const auth = require("./auth/auth");
const users = require("./users/users");
const vehicle_brands = require("./vehicles/vehicle_brands");
const vehicle_types = require("./vehicles/vehicle_types");
const vehicle_models = require("./vehicles/vehicle_models");
const vehicle_years = require("./vehicles/vehicle_years");
const pricelist = require("./vehicles/pricelist");

module.exports = {
  auth,
  users,
  vehicle_brands,
  vehicle_types,
  vehicle_models,
  vehicle_years,
  pricelist,
};
