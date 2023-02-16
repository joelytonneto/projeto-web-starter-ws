const { userObj } = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { chaveSecretaJWT, bdPostgres } = require("../config/config");

exports.authUser = async (req, res, next) => {
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

    let idPerfilAcesso = user.id_perfil_acesso;

    async function getPerfilAcessoMenu() {
      const { rows } = await bdPostgres.query(
        `SELECT m.id, m.title, m."type", m.icon, m.link
        FROM "perfil-usuario-menus" as p inner join "menus" as m on
        p.id_menu = m.id_menu WHERE p.id_perfil_usuario = $1`,
        [idPerfilAcesso]
      );
      return rows;
    }

    const perfilAcessoMenus = await getPerfilAcessoMenu();

    let menus = {};

    menus.compact = perfilAcessoMenus;
    menus.default = perfilAcessoMenus;
    menus.futuristic = perfilAcessoMenus;
    menus.horizontal = perfilAcessoMenus;

    let usuarioRetorno = {
      avatar: user.avatar,
      email: user.email,
      id: user.id,
      name: user.name,
      status: user.status,
      menus: menus
    };

    const accessToken = jwt.sign({ usuarioRetorno }, chaveSecretaJWT, {
      expiresIn: 3600, // 24 hours
    });
    let tokenType = "bearer";

    res.send({ accessToken, tokenType });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error logging in");
  }
};

exports.getAllUsers = (req, res, next) => {
  userObj.findAll()
    .then((users) => res.json(users))
    .catch((err) => next(err));
};

exports.getUserById = (req, res, next) => {
  const id = req.params.id;
  userObj.findByPk(id)
    .then((userObj) => {
      if (!userObj) {
        return res.status(404).json({
          message: 'Usuário não encontrado'
        });
      }
      return res.json(userObj);
    })
    .catch((err) => next(err));
};

exports.createUser = async (req, res, next) => {
  const { name, user, avatar, status, email, password, id_perfil_acesso } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  userObj.create({
    name,
    user,
    avatar,
    status,
    email,
    password: hashedPassword,
    id_perfil_acesso
  })
    .then((userObj) => res.status(201).json(userObj))
    .catch((err) => next(err));
};

exports.updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { name, user, avatar, status, email, password, id_perfil_acesso } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  userObj.findByPk(id)
    .then((userObj) => {
      if (!userObj) {
        return res.status(404).json({
          message: 'Usuário não encontrado'
        });
      } else {
        userObj.update({
          name,
          user,
          avatar,
          status,
          email,
          password: hashedPassword,
          id_perfil_acesso }, { where: { id } })
          .then(() => res.status(200).json({ message: 'Usuário atualizado com sucesso' }))
          .catch((err) => next(err));
      }
    })
    .catch((err) => next(err));
};

exports.deleteUser = (req, res, next) => {
  const id = req.params.id;
  userObj.destroy({ where: { id } })
    .then(() => res.status(204).json({ message: 'Usuário deletado com sucesso' }))
    .catch((err) => next(err));
};