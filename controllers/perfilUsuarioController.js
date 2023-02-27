const { perfilUsuario } = require('../models/perfilUsuario');

exports.listarPerfisPaginado = (req, res, next) => {
  const limit = parseInt(req.query.size) || 10;
  const offset = parseInt(req.query.page) * parseInt(req.query.size) || 0;

  perfilUsuario.findAndCountAll({
    limit,
    offset,
    order: [['id', 'ASC']]
  })
  .then(perfis => {
    const totalPages = Math.ceil(perfis.count / limit);
    res.json({
      perfis: perfis.rows,
      totalPages,
      currentPage: Math.floor(offset / limit) + 1,
      totalRegistros: perfis.count
    });
  })
  .catch(err => next(err));
};

exports.getAllperfisUsuario = (req, res, next) => {
  perfilUsuario.findAll()
    .then((perfils) => res.json(perfils))
    .catch((err) => next(err));
};

exports.getPerfilUsuarioById = (req, res, next) => {
  const id = req.params.id;
  perfilUsuario.findByPk(id)
    .then((perfilUsuario) => {
      if (!perfilUsuario) {
        return res.status(404).json({
          message: 'Perfil de Usuário não encontrado'
        });
      }
      return res.json(perfilUsuario);
    })
    .catch((err) => next(err));
};

exports.createPerfilUsuario = (req, res, next) => {
  const { id_sistema, descricao, ativo } = req.body;
  perfilUsuario.create({
    id_sistema,
    descricao,
    ativo
  })
    .then((perfilUsuario) => res.status(201).json(perfilUsuario))
    .catch((err) => next(err));
};

exports.updatePerfilUsuario = (req, res, next) => {
  const id = req.params.id;
  const { id_sistema, descricao, ativo } = req.body;

  perfilUsuario.findByPk(id)
    .then((perfilUsuario) => {
      if (!perfilUsuario) {
        return res.status(404).json({
          message: 'Perfil de Usuário não encontrado'
        });
      } else {
        perfilUsuario.update({
          id_sistema,
          descricao,
          ativo }, { where: { id } })
          .then(() => res.status(200).json({ message: 'Perfil de Usuário atualizado com sucesso' }))
          .catch((err) => next(err));
      }
    })
    .catch((err) => next(err));
};

exports.deletePerfilUsuario = (req, res, next) => {
  const id = req.params.id;
  perfilUsuario.destroy({ where: { id } })
    .then(() => res.status(204).json({ message: 'Perfil de Usuário deletado com sucesso' }))
    .catch((err) => next(err));
};