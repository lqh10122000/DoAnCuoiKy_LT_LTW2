const { DataTypes } = require('sequelize');
const db = require('./db');
const Movie = db.define('Movie', {
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
    }
});

Movie.findByName = async function (Name) {
    return Movie.findOne({
        where: {
            Name,
        },
    });
};

Movie.findById = async function (id) {
    return Movie.findByPk(id);
}

module.exports = Movie;