const { DataTypes } = require('sequelize');
const { conexaoSequelize } = require("../config/config");
 
const perfilUsuarioMenu = conexaoSequelize.define('perfil-usuario-menu', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_menu: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'menus',
      key: 'id_menu'
    }
  },
  id_perfil_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'perfil-usuarios',
      key: 'id'
    }
  }  
});

module.exports = { perfilUsuarioMenu };