const express = require("express");
const routerUsuario = express();

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const { chaveSecretaJWT, bdPostgres } = require("../../../config/config");
const { verifyToken } = require("../../../routes/auth");

// Cria um usuário
routerUsuario.post("/users", verifyToken, async (req, res) => {
  try {
    const { name, user, avatar, status, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const { rows } = await bdPostgres.query(
      `INSERT INTO users ("name", "user", avatar, status, email, "password") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, user, avatar, status, email, hashedPassword]
    );
    res.send(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating user");
  }
});

// Autentica um usuário
routerUsuario.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { rows } = await bdPostgres.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (rows.length === 0) {
      return res.status(401).send("Email or password is incorrect");
    }
    const user = rows[0];
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send("Email or password is incorrect");
    }

    let menus = { compact: {}, default: {}, futuristic: {},  horizontal: {} }
    
    menus.compact = 
    [        
      {
        "id": "example2",
        "title": "Testando Example",
        "type": "basic",
        "icon": "heroicons_outline:chart-pie",
        "link": "/testando-example"
      }
    ];

    menus.default = 
    [
      {
        "id": "example1",
        "title": "Example 1",
        "type": "basic",
        "icon": "heroicons_outline:chart-pie",
        "link": "/testando-example"
      },
      {
        "id": "example2",
        "title": "Example 2",
        "type": "basic",
        "icon": "heroicons_outline:chart-pie",
        "link": "/testando-example"
      },
      {
        "id": "example3",
        "title": "Example 3",
        "type": "basic",
        "icon": "heroicons_outline:chart-pie",
        "link": "/testando-example"
      }
    ];

    menus.futuristic =
    [        
      {
        "id": "example2",
        "title": "Testando Example",
        "type": "basic",
        "icon": "heroicons_outline:chart-pie",
        "link": "/testando-example"
      }
    ];

    menus.horizontal =
    [        
      {
        "id": "example2",
        "title": "Testando Example",
        "type": "basic",
        "icon": "heroicons_outline:chart-pie",
        "link": "/testando-example"
      }
    ];
    
    const accessToken = jwt.sign({ id: user.id, menus: menus }, chaveSecretaJWT, {
      expiresIn: 3600, // 24 hours
    });
    let tokenType = "bearer";

    let usuarioRetorno = {
      avatar: user.avatar,
      email: user.email,
      id: user.id,
      name: user.name,
      status: user.status,
    };

    res.send({ user: usuarioRetorno, accessToken, tokenType });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error logging in");
  }
});

// Pega todos os usuários
routerUsuario.get("/users", verifyToken, async (req, res) => {
  try {
    const { rows } = await bdPostgres.query("SELECT * FROM users");
    res.send(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting users");
  }
});

// Pega um usuário por ID
routerUsuario.get("/users/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await bdPostgres.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).send("User not found");
    }
    res.send(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting user");
  }
});

// Atualiza um usuário
routerUsuario.patch("/users/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, user, avatar, status, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const { rows } = await bdPostgres.query(
      `UPDATE users SET "name" = $1, "user" = $2, avatar = $3, status = $4, email = $5, password = $6 WHERE id = $7 RETURNING *`,
      [name, user, avatar, status, email, hashedPassword, id]
    );
    if (rows.length === 0) {
      return res.status(404).send("User not found");
    }
    res.send(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating user");
  }
});

// Deleta um usuário
routerUsuario.delete("/users/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await bdPostgres.query("DELETE FROM users WHERE id = $1", [
      id,
    ]);
    if (rows.length === 0) {
      return res.status(404).send("User not found");
    }
    res.send("User deleted");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting user");
  }
});

module.exports = routerUsuario;
