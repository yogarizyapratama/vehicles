const Pricelist = require("../../models/pricelist");
const { validationResult } = require("express-validator");
const { Op } = require("sequelize");

Pricelist.sync();

exports.GET = async (req, res, next) => {
  const { limit, skip, model_id } = req.query;
  const whereCondition = {};

  if (model_id) {
    whereCondition.model_id = {
      [Op.like]: `%${model_id}%`,
    };
  }

  try {
    const countData = model_id
      ? await Pricelist.count({ where: whereCondition })
      : await Pricelist.count();

    const data = await Pricelist.findAll({
      where: whereCondition,
      attributes: [
        "id",
        "price",
        "year_id",
        "model_id",
        "createdAt",
        "updatedAt",
      ],
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
    const data = await Pricelist.findOne({
      where: {
        id: id,
      },
      attributes: [
        "id",
        "price",
        "year_id",
        "model_id",
        "createdAt",
        "updatedAt",
      ],
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
    price: req.body.price,
    year_id: req.body.year_id,
    model_id: req.body.model_id,
  };

  try {
    await Pricelist.create(createData);
    res.status(201).json({
      message: "data pricelist berhasil disimpan",
      data: {
        price: req.body.price,
        year_id: req.body.year_id,
        model_id: req.body.model_id,
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
    const pricelists = await Pricelist.findByPk(id);

    if (!pricelists) {
      res.status(404).json({
        message: "data tidak ditemukan",
      });
    }

    (pricelists.price = req.body.price),
      (pricelists.year_id = req.body.year_id);
    pricelists.model_id = req.body.model_id;

    await pricelists.save();

    res.status(200).json({
      message: "data berhasil diperbarui",
      data: {
        id,
        price: req.body.price,
        year_id: req.body.year_id,
        model_id: req.body.model_id,
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

  const data = await Pricelist.findOne({
    where: {
      id: id,
    },
  });

  if (data) {
    try {
      await Pricelist.destroy({
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
