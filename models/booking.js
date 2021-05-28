const { DataTypes } = require('sequelize');
const db = require('./db');
const Booking = db.define('Booking', {
    User_Id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ShowTime_Id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    Total_Money: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    }
});

Booking.findById = async function (id) {
    return Booking.findByPk(id);
}

module.exports = Booking;