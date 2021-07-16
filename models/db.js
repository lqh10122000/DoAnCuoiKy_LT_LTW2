require('dotenv').config();
const { Sequelize } = require('sequelize');
module.exports = new Sequelize(process.env.DATABASE_URL || `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`, 
{
    dialect: 'postgres',
      dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        }
    }
});
