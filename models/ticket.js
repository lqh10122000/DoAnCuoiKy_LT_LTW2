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
    type: DataTypes.INTEGER,
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

Ticket.createTicket = async function (bookingId, seatCode, price) {
  Ticket.create({
    bookingId: `${bookingId}`,
    seatCode: `${seatCode}`,
    price: `${price}`,
  });
};

Ticket.findBookingId = async function (bookingId) {
  return Ticket.findAll({
    where: {
      bookingId,
    },
  });
};

Ticket.findTicketByBookingId = async function (bookingId) {
  return Ticket.findAll({
    where: {
      bookingId,
    },
  });
};

module.exports = Ticket;
