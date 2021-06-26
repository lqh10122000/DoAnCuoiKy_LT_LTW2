const { DataTypes } = require("sequelize");
const db = require("./db");
const TheaterCluster = db.define("TheaterCluster", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  theaterClusterId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  addressMaps: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

TheaterCluster.findByName = async function (name) {
  return TheaterCluster.findOne({
    where: {
      name,
    },
  });
};

TheaterCluster.findById = async function (id) {
  return TheaterCluster.findByPk(id);
};

TheaterCluster.findAllId = async function (id) {
  return TheaterCluster.findAll({
    where: {
      id,
    },
  });
};


TheaterCluster.findTheaterByTheaterCluster = async function (id)
{
  return TheaterCluster.findOne({
    where: {
      id,
    },
  });
}

module.exports = TheaterCluster;
