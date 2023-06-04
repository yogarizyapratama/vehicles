const User = require("../../models/users");
const Authentication = require("../../middleware/authentication");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

User.sync();

exports.Login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const userData = await User.findOne({
      where: {
        email: email,
      },
    });

    const user = {
      id_user: userData.id,
    };

    const jwt = Authentication.CreateToken(user);

    if (userData) {
      const isPasswordMatch = await bcrypt.compare(password, userData.password);
      if (isPasswordMatch) {
        res.status(200).json({
          jwt,
        });
      } else {
        res.json({
          message: "password mismatch",
        });
      }
    } else {
      res.status(404).json({
        message: "akun tidak ditemukan",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};

exports.Register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const email = req.body.email;
  const name = req.body.name;
  const is_admin = req.body.is_admin;
  const password = req.body.password;

  const hashedPassword = await bcrypt.hash(password, 10);

  const saveData = {
    email: email,
    name: name,
    is_admin: is_admin,
    password: hashedPassword,
  };

  try {
    const findEmail = await User.findOne({
      where: {
        email: email,
      },
    });

    if (findEmail) {
      return res.status(200).json({
        message: "email sudah digunakan",
      });
    }

    await User.create(saveData);

    res.status(201).json({
      message: "akun berhasil dibuat",
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};
