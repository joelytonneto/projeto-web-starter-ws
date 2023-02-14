const { DataTypes } = require('sequelize');
const { conexaoSequelize } = require("../config/config");
 
const menu = conexaoSequelize.define('menu', {
  id_menu: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: true
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_sistema: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  has_sub_menu: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  parent_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  ordem: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
});

const syncSequelize = conexaoSequelize.sync();

module.exports = { menu, syncSequelize };