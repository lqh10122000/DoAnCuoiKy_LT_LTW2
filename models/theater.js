const { DataTypes } = require("sequelize");
const db = require("./db");
const Theater = db.define("Theater", {
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  TheaterCluster_Id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Species: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Horizontal_Size: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  Wide_Size: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
});

Theater.findByName = async function (Name) {
  return Theater.findOne({
    where: {
      Name,
    },
  });
};

Theater.findById = async function (id) {
  return Theater.findByPk(id);
};

module.exports = Theater;
