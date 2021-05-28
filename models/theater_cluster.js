const { DataTypes } = require('sequelize');
const db = require('./db');
const TheaterCluster = db.define('TheaterCluster', {
    Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Address: {
        type: DataTypes.STRING,
        allowNull: false,
    }  
});

TheaterCluster.findByName = async function (Name) {
    return TheaterCluster.findOne({
        where: {
            Name,
        },
    });
};

TheaterCluster.findById = async function (id) {
    return TheaterCluster.findByPk(id);
}

module.exports = TheaterCluster;