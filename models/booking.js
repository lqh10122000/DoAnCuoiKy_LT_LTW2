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
};

module.exports = Booking;
