const VehicleModels = require("../../models/vehicle_models");
const { validationResult } = require("express-validator");
const { Op } = require("sequelize");

VehicleModels.sync();

exports.GET = async (req, res, next) => {
  const { limit, skip, model_name } = req.query;
  const whereCondition = {};

  if (model_name) {
    whereCondition.name = {
      [Op.like]: `%${model_name}%`,
    };
  }

  try {
    const countData = model_name
      ? await VehicleModels.count({ where: whereCondition })
      : await VehicleModels.count();

    const data = await VehicleModels.findAll({
      where: whereCondition,
      attributes: ["id", "name", "type_id", "createdAt", "updatedAt"],
      limit: parseInt(limit) || 10,
      offset: parseInt(skip) || 0,
    });

    res.status(200).json({
      total: countData,
      limit: parseInt(limit) || 10,
      skip: parseInt(skip) || 0,
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};

exports.GETBYID = async (req, res, next) => {
  const id_user = req.params.id;

  try {
    const data = await VehicleModels.findOne({
      where: {
        id: id_user,
      },
      attributes: ["id", "name", "type_id", "createdAt", "updatedAt"],
    });

    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "data tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};

exports.CREATE = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const createData = {
    name: req.body.name,
    type_id: req.body.type_id,
  };

  try {
    await VehicleModels.create(createData);
    res.status(201).json({
      message: "data vehicle model berhasil disimpan",
      data: {
        name: req.body.name,
        type_id: req.body.type_id,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};

exports.UPDATE = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const id = req.params.id;

  try {
    const vehicle_models = await VehicleModels.findByPk(id);

    if (!vehicle_models) {
      res.status(404).json({
        message: "data tidak ditemukan",
      });
    }

    vehicle_models.name = req.body.name;
    vehicle_models.type_id = req.body.type_id;

    await vehicle_models.save();

    res.status(200).json({
      message: "data berhasil diperbarui",
      data: {
        id,
        name: req.body.name,
        type_id: id,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};

exports.DELETE = async (req, res, next) => {
  const id = req.params.id;

  const data = await VehicleModels.findOne({
    where: {
      id: id,
    },
  });

  if (data) {
    try {
      await VehicleModels.destroy({
        where: {
          id: id,
        },
      });

      res.status(200).json({
        message: "data berhasil dihapus",
      });
    } catch (error) {
      res.status(500).json({
        message: "server error",
        error: error.message,
      });
    }
  } else {
    res.status(404).json({
      message: "data tidak ditemukan",
    });
  }
};
