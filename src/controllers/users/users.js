const User = require("../../models/users");
const { validationResult } = require("express-validator");

exports.Users = async (req, res, next) => {
  const { limit, skip } = req.query;

  try {
    const total = await User.count();

    const data = await User.findAll({
      attributes: ["id", "name", "email", "is_admin"],
      limit: parseInt(limit) || 10,
      offset: parseInt(skip) || 0,
    });

    res.status(200).json({
      total: total,
      limit: parseInt(limit) || 10,
      skip: parseInt(skip) || 0,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};

exports.UserById = async (req, res, next) => {
  const user_id = req.params.id;

  const data = await User.findOne({
    attributes: ["id", "name", "email", "is_admin"],
    where: {
      id: user_id,
    },
  });

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({
      message: "data user tidak ditemukan",
    });
  }
};

exports.UpdateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, is_admin } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        message: "Data user tidak ditemukan",
      });
    }

    user.name = name;
    user.email = email;
    user.is_admin = is_admin;

    await user.save();

    res.status(200).json({
      message: "Data user berhasil diperbarui",
      data: {
        id,
        name,
        email,
        is_admin,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};

exports.DeleteUser = async (req, res, next) => {
  const user_id = req.params.id;
  const data = await User.findOne({
    where: {
      id: user_id,
    },
  });

  if (data) {
    try {
      await User.destroy({
        where: {
          id: user_id,
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
