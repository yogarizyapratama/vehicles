const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const VehiclesBrands = sequelize.define(
  "vehicle_brands",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = VehiclesBrands;
