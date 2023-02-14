const express = require('express');
const routerMenu = express();

const menuController = require('../../../controllers/menuController');

routerMenu.get("/menus", menuController.getAllMenus);
routerMenu.get('/menus/:id', menuController.getMenuById);
routerMenu.post('/menus', menuController.createMenu);
routerMenu.put('/menus/:id', menuController.updateMenu);
routerMenu.delete('/menus/:id', menuController.deleteMenu);

module.exports = routerMenu;