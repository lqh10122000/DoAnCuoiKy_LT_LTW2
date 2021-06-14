const { DataTypes } = require("sequelize");
const db = require("./db");
const Booking = db.define("Booking", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  showTimeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  totalMoney: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Booking.findById = async function (id) {
  return Booking.findByPk(id);
};

Booking.findUserBooking = async function (UserId) {
  return Booking.findAll({
    where: {
      UserId,
    },
  });
};

Booking.createBooking = async function (userId, showTimeId, time, totalMoney) {
  Booking.create({
    UserId: `${userId}`,
    showTimeId: `${showTimeId}`,
    time: `${time}`,
    totalMoney: `${totalMoney}`,
  });
};

Booking.findBookingId = async function (showTimeId) {
  return Booking.findAll({
    where: {
      showTimeId,
    },
  });
};

module.exports = Booking;
