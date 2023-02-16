const express = require('express');
const routerPerfilUsuario = express();
const { verifyToken } = require("../../../routes/auth");

const perfilUsuarioController = require('../../../controllers/perfilUsuarioController');

routerPerfilUsuario.get("/perfis", verifyToken, perfilUsuarioController.getAllperfisUsuario);
routerPerfilUsuario.get('/perfil/:id', verifyToken, perfilUsuarioController.getPerfilUsuarioById);
routerPerfilUsuario.post('/perfil', verifyToken, perfilUsuarioController.createPerfilUsuario);
routerPerfilUsuario.put('/perfil/:id', verifyToken, perfilUsuarioController.updatePerfilUsuario);
routerPerfilUsuario.delete('/perfil/:id', verifyToken, perfilUsuarioController.deletePerfilUsuario);

module.exports = routerPerfilUsuario;