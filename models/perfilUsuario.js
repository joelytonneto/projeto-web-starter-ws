const { DataTypes } = require('sequelize');
const { conexaoSequelize } = require("../config/config");
 
const perfilUsuario = conexaoSequelize.define('perfil-usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_sistema: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false
  },  
  ativo: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  }  
});

const syncSequelize = conexaoSequelize.sync();

module.exports = { perfilUsuario, syncSequelize };