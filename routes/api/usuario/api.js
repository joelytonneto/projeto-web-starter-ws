const express = require('express');
const routerUser = express();
const { verifyToken, verificarPermissao } = require("../../../routes/auth");

const userController = require('../../../controllers/userController');

routerUser.get("/users-paginado", verifyToken, verificarPermissao(['controle-acesso.usuarios']), userController.listarUsuariosPaginado);
routerUser.get("/users", verifyToken, verificarPermissao(['controle-acesso.usuarios']), userController.getAllUsers);
routerUser.get('/users/:id', verifyToken, verificarPermissao(['controle-acesso.usuarios']), userController.getUserById);
routerUser.post('/users', verifyToken, verificarPermissao(['controle-acesso.usuarios']), userController.createUser);
routerUser.put('/users/:id', verifyToken, verificarPermissao(['controle-acesso.usuarios']), userController.updateUser);
routerUser.delete('/users/:id', verifyToken, verificarPermissao(['controle-acesso.usuarios']), userController.deleteUser);
routerUser.post('/login', userController.authUser);

module.exports = routerUser;