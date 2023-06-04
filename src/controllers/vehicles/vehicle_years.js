const VehicleYears = require("../../models/vehicles_years");
const { validationResult } = require("express-validator");

VehicleYears.sync();

exports.GET = async (req, res, next) => {
  const { limit, skip } = req.query;

  try {
    const countData = await VehicleYears.count();

    const data = await VehicleYears.findAll({
      attributes: ["id", "year", "createdAt", "updatedAt"],
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
    const data = await VehicleYears.findOne({
      where: {
        id: id_user,
      },
      attributes: ["id", "year", "createdAt", "updatedAt"],
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
    year: req.body.year,
  };

  try {
    await VehicleYears.create(createData);
    res.status(201).json({
      message: "data vehicle year berhasil disimpan",
      data: {
        year: req.body.year,
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
    const vehicle_years = await VehicleYears.findByPk(id);

    if (!vehicle_years) {
      res.status(404).json({
        message: "data tidak ditemukan",
      });
    }

    vehicle_years.year = req.body.year;

    await vehicle_years.save();

    res.status(200).json({
      message: "data berhasil diperbarui",
      data: {
        id,
        year: req.body.year,
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

  const data = await VehicleYears.findOne({
    where: {
      id: id,
    },
  });

  if (data) {
    try {
      await VehicleYears.destroy({
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
