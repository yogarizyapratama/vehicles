const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const VehiclesTypes = require("./vehicle_types");

const VehiclesModels = sequelize.define(
  "vehicle_models",
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
VehiclesTypes.hasMany(VehiclesModels, {
  foreignKey: {
    name: "type_id",
    type: DataTypes.UUID,
    allowNull: false,
  },
});

VehiclesModels.belongsTo(VehiclesTypes, {
  foreignKey: {
    name: "type_id",
    type: DataTypes.UUID,
    allowNull: false,
  },
});

module.exports = VehiclesModels;
