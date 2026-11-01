const sequelize = require('../../config/database');
const { DataTypes } = require('sequelize');

const User = require('./usersModel')(sequelize, DataTypes);
const Transactions = require('./transactionsModel')(sequelize, DataTypes);

module.exports = {
  sequelize,
  User,
  Transactions,
};