const { DataTypes } = require('sequelize');
const db = require('./db');
const Movie = db.define('Movie', {
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

Movie.findByName = async function (name) {
    return Movie.findOne({
        where: {
            name,
        },
    });
};

Movie.findById = async function (id) {
    return Movie.findByPk(id);
}

module.exports = Movie;