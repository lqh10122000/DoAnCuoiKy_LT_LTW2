const { DataTypes } = require("sequelize");
const db = require("./db");
const ShowTime = db.define("ShowTime", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  movieId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  theaterId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  theaterClusterId: {
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

ShowTime.findTheaterClusterId = async function (theaterClusterId) {
  return ShowTime.findAll({
    where: {
      theaterClusterId,
    },
  });
};



ShowTime.findIdByTheaterCluster = async function (theaterClusterId) {
  return ShowTime.findAll({
    where: {
      theaterClusterId,
    },
  });
};


ShowTime.findIdByMovie = async function (movieId)
{
  return ShowTime.findAll({
    where: {
      movieId,
    },
  });
}

ShowTime.findById = async function (id) {
  return ShowTime.findByPk(id);
};

ShowTime.findAllId = async function (id) {
  return ShowTime.findAll({
    where: {
      id,
    },
  });
};

module.exports = ShowTime;
