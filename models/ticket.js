const { DataTypes } = require('sequelize');
const db = require('./db');
const Ticket = db.define('Ticket', {
    Booking_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Seat_Code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    }
});

Ticket.findById = async function (id) {
    return Ticket.findByPk(id);
}

module.exports = Ticket;