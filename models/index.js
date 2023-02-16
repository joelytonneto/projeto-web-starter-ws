const { syncSequelize } = require('../models/menu');
const { menu } = require('../models/menu');
const { perfilUsuario } = require('../models/perfilUsuario');
const { perfilUsuarioMenu } = require('../models/perfilUsuarioMenu');

module.exports = { menu, perfilUsuario, perfilUsuarioMenu, syncSequelize }