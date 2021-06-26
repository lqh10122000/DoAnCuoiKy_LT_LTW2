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
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
    }, { 
        timestamps: false 
});

module.exports = FavoriteMovie;