const { DataTypes } = require('sequelize');
const db = require('./db');
const Theater = db.define('Theater', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    theaterClusterId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    species: {
        type: DataTypes.STRING,
        allowNull: false,
    }   ,
    horizontalSize: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    wideSize: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
});

Theater.findByName = async function (name) {
    return Theater.findOne({
        where: {
            name,
        },
    });
};

Theater.findById = async function (id) {
    return Theater.findByPk(id);
}

module.exports = Theater;