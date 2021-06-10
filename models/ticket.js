const { DataTypes } = require("sequelize");
const db = require("./db");
const Ticket = db.define("Ticket", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  bookingId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  seatCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
});

Ticket.findById = async function (id) {
  return Ticket.findByPk(id);
};

module.exports = Ticket;
