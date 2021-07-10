const { DataTypes } = require("sequelize");
const db = require("./db");
const User = db.define("User", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  displayName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  picture: {
    type: DataTypes.BLOB,
    allowNull: true,
  },
  token: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
});

User.findByEmail = async function (email) {
  return User.findOne({
    where: {
      email,
    },
  });
};

User.findById = async function (id) {
  return User.findByPk(id);
};

module.exports = User;
