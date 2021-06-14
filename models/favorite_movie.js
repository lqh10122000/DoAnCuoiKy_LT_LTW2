const { DataTypes } = require("sequelize");
const db = require("./db");
const FavoriteMovie = db.define("FavoriteMovie", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  numberLike: {
    type: DataTypes.INTEGER,
    allowNull: true,
    values: 0,
  },
    }, { 
        timestamps: false 
});

module.exports = FavoriteMovie;