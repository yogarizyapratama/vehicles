const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("successfully connected to database");
  })
  .catch((err) => console.log(err));

module.exports = sequelize;
