const express = require('express');
const routerMenu = express();
const { verifyToken, verificarPermissao } = require("../../../routes/auth");

const menuController = require('../../../controllers/menuController');

routerMenu.get("/menus-paginado", verifyToken, verificarPermissao(['controle-acesso.menus']), menuController.listarMenusPaginado);
routerMenu.get("/menus", verifyToken, verificarPermissao(['controle-acesso.menus']), menuController.getAllMenus);
routerMenu.get('/menus/:id', verifyToken, verificarPermissao(['controle-acesso.menus']), menuController.getMenuById);
routerMenu.post('/menus', verifyToken, verificarPermissao(['controle-acesso.menus']), menuController.createMenu);
routerMenu.put('/menus/:id', verifyToken, verificarPermissao(['controle-acesso.menus']), menuController.updateMenu);
routerMenu.delete('/menus/:id', verifyToken, verificarPermissao(['controle-acesso.menus']), menuController.deleteMenu);

module.exports = routerMenu;