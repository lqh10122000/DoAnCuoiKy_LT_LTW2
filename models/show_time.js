const { DataTypes } = require("sequelize");
const db = require("./db");
const ShowTime = db.define("ShowTime", {
  movieId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  theaterId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
});

ShowTime.findByMovieId = async function (movieId) {
  return ShowTime.findAll({
    where: {
      movieId,
    },
  });
};

ShowTime.findByTheaterId = async function (theaterId) {
  return ShowTime.findOne({
    where: {
      theaterId,
    },
  });
};

ShowTime.findById = async function (id) {
  return ShowTime.findByPk(id);
};

module.exports = ShowTime;
