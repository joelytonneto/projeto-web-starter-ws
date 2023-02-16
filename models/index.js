const { syncSequelize } = require('../models/menu');
const { user } = require('../models/user');
const { menu } = require('../models/menu');
const { perfilUsuario } = require('../models/perfilUsuario');
const { perfilUsuarioMenu } = require('../models/perfilUsuarioMenu');

module.exports = { user, menu, perfilUsuario, perfilUsuarioMenu, syncSequelize }