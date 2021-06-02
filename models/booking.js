const { DataTypes } = require('sequelize');
const db = require('./db');
const Booking = db.define('Booking', {
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    showTimeId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    totalMoney: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
});

Booking.findById = async function (id) {
    return Booking.findByPk(id);
}

module.exports = Booking;