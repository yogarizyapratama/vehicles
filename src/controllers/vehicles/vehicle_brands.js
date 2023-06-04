const VehicleBrands = require("../../models/vehicle_brands");
const { validationResult } = require("express-validator");
const { Op } = require("sequelize");

VehicleBrands.sync();

exports.GET = async (req, res, next) => {
  const { limit, skip, brand_name } = req.query;
  const whereCondition = {};

  if (brand_name) {
    whereCondition.name = {
      [Op.like]: `%${brand_name}%`,
    };
  }

  try {
    const countData = brand_name
      ? await VehicleBrands.count({ where: whereCondition })
      : await VehicleBrands.count();

    const data = await VehicleBrands.findAll({
      where: whereCondition,
      attributes: ["id", "name", "createdAt", "updatedAt"],
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
    const data = await VehicleBrands.findOne({
      where: {
        id: id,
      },
      attributes: ["id", "name", "createdAt", "updatedAt"],
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
  };

  try {
    await VehicleBrands.create(createData);
    res.status(201).json({
      message: "data vehicle brand berhasil disimpan",
      data: {
        name: req.body.name,
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
    const vehicle_brands = await VehicleBrands.findByPk(id);

    if (!vehicle_brands) {
      res.status(404).json({
        message: "data tidak ditemukan",
      });
    }

    vehicle_brands.name = req.body.name;
    await vehicle_brands.save();

    res.status(200).json({
      message: "data berhasil diperbarui",
      data: {
        id,
        name: req.body.name,
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

  const data = await VehicleBrands.findOne({
    where: {
      id: id,
    },
  });

  if (data) {
    try {
      await VehicleBrands.destroy({
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
