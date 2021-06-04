const { DataTypes } = require("sequelize");
const db = require("./db");
const Movie = db.define("Movie", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  premiereDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  picturePoster: {
    type: DataTypes.BLOB,
    allowNull: true,
  },
  time: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Movie.findById = async function (id) {
  return Movie.findOne({
    where: {
      id,
    },
  });
};

Movie.getAllMovies = async function () {
  const allMovies = db.query('select * from public."Movies"');
  return allMovies;
};

module.exports = Movie;
