const express = require('express');
const routerPerfilUsuarioMenu = express();
const { verifyToken, verificarPermissao } = require("../../../routes/auth");

const perfilUsuarioMenuController = require('../../../controllers/perfilUsuarioMenuController');

routerPerfilUsuarioMenu.get("/perfis/:id", verifyToken, verificarPermissao(['controle-acesso.perfis']), perfilUsuarioMenuController.getMenusByIdPerfil);
routerPerfilUsuarioMenu.get("/perfis", verifyToken, verificarPermissao(['controle-acesso.perfis']), perfilUsuarioMenuController.getAllperfisUsuarioMenu);
routerPerfilUsuarioMenu.get('/perfil/:id', verifyToken, verificarPermissao(['controle-acesso.perfis']), perfilUsuarioMenuController.getPerfilUsuarioMenuById);
routerPerfilUsuarioMenu.post('/perfil', verifyToken, verificarPermissao(['controle-acesso.perfis']), perfilUsuarioMenuController.createPerfilUsuarioMenu);
routerPerfilUsuarioMenu.put('/perfil/:id', verifyToken, verificarPermissao(['controle-acesso.perfis']), perfilUsuarioMenuController.updatePerfilUsuarioMenu);
routerPerfilUsuarioMenu.delete('/perfil/:id', verifyToken, verificarPermissao(['controle-acesso.perfis']), perfilUsuarioMenuController.deletePerfilUsuarioMenu);
routerPerfilUsuarioMenu.delete('/perfil/perfil-usuario-id/:id', verifyToken, verificarPermissao(['controle-acesso.perfis']), perfilUsuarioMenuController.deletePerfilUsuarioMenuByIdPerfil);

module.exports = routerPerfilUsuarioMenu;