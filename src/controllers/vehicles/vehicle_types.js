const VehicleTypes = require("../../models/vehicle_types");
const { validationResult } = require("express-validator");
const { Op } = require("sequelize");

VehicleTypes.sync();

exports.GET = async (req, res, next) => {
  const { limit, skip, brand_id } = req.query;
  const whereCondition = {};

  if (brand_id) {
    whereCondition.brand_id = {
      [Op.like]: `%${brand_id}%`,
    };
  }

  try {
    const countData = brand_id
      ? await VehicleTypes.count({ where: whereCondition })
      : await VehicleTypes.count();

    const data = await VehicleTypes.findAll({
      where: whereCondition,
      attributes: ["id", "name", "brand_id", "createdAt", "updatedAt"],
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
  const id = req.params.id;

  try {
    const data = await VehicleTypes.findOne({
      where: {
        id: id,
      },
      attributes: ["id", "name", "brand_id", "createdAt", "updatedAt"],
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
    brand_id: req.body.brand_id,
  };

  try {
    await VehicleTypes.create(createData);
    res.status(201).json({
      message: "data vehicle type berhasil disimpan",
      data: {
        name: req.body.name,
        brand_id: req.body.brand_id,
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
    const vehicle_types = await VehicleTypes.findByPk(id);

    if (!vehicle_types) {
      res.status(404).json({
        message: "data tidak ditemukan",
      });
    }

    vehicle_types.name = req.body.name;
    vehicle_types.brand_id = req.body.brand_id;

    await vehicle_types.save();

    res.status(200).json({
      message: "data berhasil diperbarui",
      data: {
        id,
        name: req.body.name,
        brand_id: id,
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

  const data = await VehicleTypes.findOne({
    where: {
      id: id,
    },
  });

  if (data) {
    try {
      await VehicleTypes.destroy({
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
