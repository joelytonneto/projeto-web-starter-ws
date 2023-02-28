const jwt = require("jsonwebtoken");
const { chaveSecretaJWT } = require("../config/config");

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.accessToken = bearerToken;
    jwt.verify(req.accessToken, chaveSecretaJWT, (err, data) => {
      if (err) {
        return res.status(401).send("Token is invalid");
      }
      req.userId = data.id;
      next();
    });
  } else {
    return res.status(401).send("Token is required");
  }
}

function verificarPermissao(permissoes) {
  return function(req, res, next) {

    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.accessToken = bearerToken;
      jwt.verify(req.accessToken, chaveSecretaJWT, (err, data) => {
        let idsMenusPermitidos = [];
        let menusUsuario = data.usuarioRetorno.menus.default;
        menusUsuario.forEach(menu => {
          idsMenusPermitidos.push(menu.id);
          if(menu.children != undefined) {
            menu.children.forEach(menuFilho => {
              idsMenusPermitidos.push(menuFilho.id);
            })
          }
        });

        if(!(idsMenusPermitidos.includes(permissoes[0]))) {
          return res.status(403).json({ message: "Usuário não tem permissão para acessar esta rota" });
        }

        if (err) {
          return res.status(401).send("Token is invalid");
        }
        next();
      });
    } else {
      return res.status(401).send("Token is required");
    }
  }
}

module.exports = { verifyToken, verificarPermissao };
