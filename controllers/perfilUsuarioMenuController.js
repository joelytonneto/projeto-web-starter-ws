const { perfilUsuarioMenu } = require('../models/perfilUsuarioMenu');

exports.getMenusByIdPerfil = (req, res, next) => {
  const id = req.params.id;
  perfilUsuarioMenu.findAll({
    where: {
      id_perfil_usuario: id
    }
  })
    .then((perfils) => res.json(perfils))
    .catch((err) => next(err));
};

exports.getAllperfisUsuarioMenu = (req, res, next) => {
  perfilUsuarioMenu.findAll()
    .then((perfils) => res.json(perfils))
    .catch((err) => next(err));
};

exports.getPerfilUsuarioMenuById = (req, res, next) => {
  const id = req.params.id;
  perfilUsuarioMenu.findByPk(id)
    .then((perfilUsuarioMenu) => {
      if (!perfilUsuarioMenu) {
        return res.status(404).json({
          message: 'Perfil Usuário Menu não encontrado'
        });
      }
      return res.json(perfilUsuarioMenu);
    })
    .catch((err) => next(err));
};

exports.createPerfilUsuarioMenu = (req, res, next) => {
  const { id_menu, id_perfil_usuario } = req.body;
  perfilUsuarioMenu.create({
    id_menu,
    id_perfil_usuario
  })
    .then((perfilUsuarioMenu) => res.status(201).json(perfilUsuarioMenu))
    .catch((err) => next(err));
};

exports.updatePerfilUsuarioMenu = (req, res, next) => {
  const id = req.params.id;
  const { id_menu, id_perfil_usuario } = req.body;

  perfilUsuarioMenu.findByPk(id)
    .then((perfilUsuarioMenu) => {
      if (!perfilUsuarioMenu) {
        return res.status(404).json({
          message: 'Perfil Usuário Menu não encontrado'
        });
      } else {
        perfilUsuarioMenu.update({
          id_menu,
          id_perfil_usuario }, { where: { id } })
          .then(() => res.status(200).json({ message: 'Perfil Usuário Menu atualizado com sucesso' }))
          .catch((err) => next(err));
      }
    })
    .catch((err) => next(err));
};

exports.deletePerfilUsuarioMenuByIdPerfil = (req, res, next) => {
  const id_perfil_usuario = req.params.id;
  perfilUsuarioMenu.destroy({ where: { id_perfil_usuario } })
    .then(() => res.status(204).json({ message: 'Perfil limpo com sucesso' }))
    .catch((err) => next(err));
};

exports.deletePerfilUsuarioMenu = (req, res, next) => {
  const id = req.params.id;
  perfilUsuarioMenu.destroy({ where: { id } })
    .then(() => res.status(204).json({ message: 'Perfil Usuário Menu deletado com sucesso' }))
    .catch((err) => next(err));
};