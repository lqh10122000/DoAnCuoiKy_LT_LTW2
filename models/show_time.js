const { DataTypes } = require('sequelize');
const db = require('./db');
const ShowTime = db.define('ShowTime', {
    Movie_Id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Theater_Id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Start: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    End: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    Price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    }
});

ShowTime.findByName = async function (Name) {
    return ShowTime.findOne({
        where: {
            Name,
        },
    });
};

ShowTime.findById = async function (id) {
    return ShowTime.findByPk(id);
}

module.exports = ShowTime;