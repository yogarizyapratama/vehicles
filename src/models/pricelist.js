const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const VehiclesYears = require("./vehicles_years");
const VehiclesModels = require("./vehicle_models");

const Pricelist = sequelize.define(
  "pricelist",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

// relasi
// vehicle_years
VehiclesYears.hasMany(Pricelist, {
  foreignKey: {
    name: "year_id",
    type: DataTypes.UUID,
    allowNull: false,
  },
});

Pricelist.belongsTo(VehiclesYears, {
  foreignKey: {
    name: "year_id",
    type: DataTypes.UUID,
    allowNull: false,
  },
});

// vehicle_models
VehiclesModels.hasMany(Pricelist, {
  foreignKey: {
    name: "model_id",
    type: DataTypes.UUID,
    allowNull: false,
  },
});

Pricelist.belongsTo(VehiclesModels, {
  foreignKey: {
    name: "model_id",
    type: DataTypes.UUID,
    allowNull: false,
  },
});

module.exports = Pricelist;
