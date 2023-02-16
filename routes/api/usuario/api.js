const express = require('express');
const routerUser = express();
const { verifyToken } = require("../../../routes/auth");

const userController = require('../../../controllers/userController');

routerUser.get("/users", verifyToken, userController.getAllUsers);
routerUser.get('/users/:id', verifyToken, userController.getUserById);
routerUser.post('/users', verifyToken, userController.createUser);
routerUser.put('/users/:id', verifyToken, userController.updateUser);
routerUser.delete('/users/:id', verifyToken, userController.deleteUser);
routerUser.post('/login', userController.authUser);

module.exports = routerUser;