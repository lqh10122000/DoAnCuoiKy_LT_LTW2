const { DataTypes } = require("sequelize");
const db = require("./db");
const Movie = db.define("Movie", {
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Premiere_Date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Picture_Poster: {
    type: DataTypes.BLOB,
    allowNull: true,
  },
  Time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
});

Movie.findByName = async function (Name) {
  return Movie.findOne({
    where: {
      Name,
    },
  });
};

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
