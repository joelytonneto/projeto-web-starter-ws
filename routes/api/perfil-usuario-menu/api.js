const express = require('express');
const routerPerfilUsuarioMenu = express();
const { verifyToken } = require("../../../routes/auth");

const perfilUsuarioMenuController = require('../../../controllers/perfilUsuarioMenuController');

routerPerfilUsuarioMenu.get("/perfis", verifyToken, perfilUsuarioMenuController.getAllperfisUsuarioMenu);
routerPerfilUsuarioMenu.get('/perfil/:id', verifyToken, perfilUsuarioMenuController.getPerfilUsuarioMenuById);
routerPerfilUsuarioMenu.post('/perfil', verifyToken, perfilUsuarioMenuController.createPerfilUsuarioMenu);
routerPerfilUsuarioMenu.put('/perfil/:id', verifyToken, perfilUsuarioMenuController.updatePerfilUsuarioMenu);
routerPerfilUsuarioMenu.delete('/perfil/:id', verifyToken, perfilUsuarioMenuController.deletePerfilUsuarioMenu);

module.exports = routerPerfilUsuarioMenu;