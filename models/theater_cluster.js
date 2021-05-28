const { DataTypes } = require('sequelize');
const db = require('./db');
const TheaterCluster = db.define('TheaterCluster', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    }  
});

TheaterCluster.findByName = async function (name) {
    return TheaterCluster.findOne({
        where: {
            name,
        },
    });
};

TheaterCluster.findById = async function (id) {
    return TheaterCluster.findByPk(id);
}

module.exports = TheaterCluster;