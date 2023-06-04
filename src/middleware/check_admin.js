const User = require("../models/users");

const checkAdmin = async (req, res, next) => {
  const id_user = req.user.id_user;

  const data = await User.findByPk(id_user);

  if (!data.is_admin) {
    res.status(403).json({ message: "kamu tidak memilik akses" });
    next();
  } else {
    next();
  }
};

module.exports = { checkAdmin };
