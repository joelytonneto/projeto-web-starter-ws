const { DataTypes } = require('sequelize');
const { conexaoSequelize } = require("../config/config");
 
const userObj = conexaoSequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  user: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_perfil_acesso: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'perfil-usuarios',
      key: 'id'
    }
  }
});

module.exports = { userObj };