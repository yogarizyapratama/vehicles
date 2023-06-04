const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const VehiclesBrands = require("./vehicle_brands");

const VehiclesTypes = sequelize.define(
  "vehicle_types",
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

// relasi
VehiclesBrands.hasMany(VehiclesTypes, {
  foreignKey: {
    name: "brand_id",
    type: DataTypes.UUID,
    allowNull: false,
  },
});

VehiclesTypes.belongsTo(VehiclesBrands, {
  foreignKey: {
    name: "brand_id",
    type: DataTypes.UUID,
    allowNull: false,
  },
});

module.exports = VehiclesTypes;
