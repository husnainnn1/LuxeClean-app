const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Correct path within the models folder

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  firstname: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});

module.exports = User;
