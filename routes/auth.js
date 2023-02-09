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

module.exports = { verifyToken };
