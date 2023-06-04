const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const VehiclesYears = sequelize.define(
  "vehicle_years",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = VehiclesYears;
