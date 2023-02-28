const express = require('express');
const routerPerfilUsuario = express();
const { verifyToken, verificarPermissao } = require("../../../routes/auth");

const perfilUsuarioController = require('../../../controllers/perfilUsuarioController');

routerPerfilUsuario.get("/perfis-paginado", verifyToken, verificarPermissao(['controle-acesso.perfis']), perfilUsuarioController.listarPerfisPaginado);
routerPerfilUsuario.get("/perfis", verifyToken, verificarPermissao(['controle-acesso.perfis']), perfilUsuarioController.getAllperfisUsuario);
routerPerfilUsuario.get('/perfil/:id', verifyToken, verificarPermissao(['controle-acesso.perfis']), perfilUsuarioController.getPerfilUsuarioById);
routerPerfilUsuario.post('/perfil', verifyToken, verificarPermissao(['controle-acesso.perfis']), perfilUsuarioController.createPerfilUsuario);
routerPerfilUsuario.put('/perfil/:id', verifyToken, verificarPermissao(['controle-acesso.perfis']), perfilUsuarioController.updatePerfilUsuario);
routerPerfilUsuario.delete('/perfil/:id', verifyToken, verificarPermissao(['controle-acesso.perfis']), perfilUsuarioController.deletePerfilUsuario);

module.exports = routerPerfilUsuario;