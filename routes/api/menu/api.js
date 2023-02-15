const express = require('express');
const routerMenu = express();
const { verifyToken } = require("../../../routes/auth");

const menuController = require('../../../controllers/menuController');

routerMenu.get("/menus", verifyToken, menuController.getAllMenus);
routerMenu.get('/menus/:id', verifyToken, menuController.getMenuById);
routerMenu.post('/menus', verifyToken, menuController.createMenu);
routerMenu.put('/menus/:id', verifyToken, menuController.updateMenu);
routerMenu.delete('/menus/:id', verifyToken, menuController.deleteMenu);

module.exports = routerMenu;