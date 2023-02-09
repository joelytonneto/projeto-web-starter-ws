const express = require("express");
const routerUsuario = express();

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const { chaveSecretaJWT, bdPostgres } = require("../../../config/config");
const { verifyToken } = require("../../../routes/auth");

// Cria um usuário
routerUsuario.post("/users", verifyToken, async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const { rows } = await bdPostgres.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      [email, hashedPassword]
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
    const accessToken = jwt.sign({ id: user.id }, chaveSecretaJWT, {
      expiresIn: 10, // 24 hours
    });
    res.send({ accessToken });
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
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const { rows } = await bdPostgres.query(
      "UPDATE users SET email = $1, password = $2 WHERE id = $3 RETURNING *",
      [email, hashedPassword, id]
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
