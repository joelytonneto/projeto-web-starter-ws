const { menu } = require('../models/menu');

exports.listarMenusPaginado = (req, res, next) => {
  const limit = parseInt(req.query.size) || 10;
  const offset = parseInt(req.query.page) * parseInt(req.query.size) || 0;
  
  menu.findAndCountAll({
    limit,
    offset,
    order: [['id_menu', 'ASC']]
  })
  .then(menus => {
    const totalPages = Math.ceil(menus.count / limit);
    res.json({
      menus: menus.rows,
      totalPages,
      currentPage: Math.floor(offset / limit) + 1,
      totalRegistros: menus.count
    });
  })
  .catch(err => next(err));
};

exports.getAllMenus = (req, res, next) => {
  menu.findAll()
    .then((menus) => res.json(menus))
    .catch((err) => next(err));
};

exports.getMenuById = (req, res, next) => {
  const id = req.params.id;
  menu.findByPk(id)
    .then((menu) => {
      if (!menu) {
        return res.status(404).json({
          message: 'Menu não encontrado'
        });
      }
      return res.json(menu);
    })
    .catch((err) => next(err));
};

exports.createMenu = (req, res, next) => {
  const { id, title, subtitle, type, icon, link, id_sistema, has_sub_menu, parent_id, ordem } = req.body;
  menu.create({
    id,
    title,
    subtitle,
    type,
    icon,
    link,
    id_sistema,
    has_sub_menu,
    parent_id,
    ordem
  })
    .then((menu) => res.status(201).json(menu))
    .catch((err) => next(err));
};

exports.updateMenu = (req, res, next) => {
  const id_menu = req.params.id;
  const { id, title, subtitle, type, icon, link, id_sistema, has_sub_menu, parent_id, ordem } = req.body;

  menu.findByPk(id_menu)
    .then((menu) => {
      if (!menu) {
        return res.status(404).json({
          message: 'Menu não encontrado'
        });
      } else {
        menu.update({
          id,
          title,
          subtitle,
          type,
          icon,
          link,
          id_sistema,
          has_sub_menu,
          parent_id,
          ordem }, { where: { id_menu } })
          .then(() => res.status(200).json({ message: 'Menu atualizado com sucesso' }))
          .catch((err) => next(err));
      }
    })
    .catch((err) => next(err));
};

exports.deleteMenu = (req, res, next) => {
  const id_menu = req.params.id;
  menu.destroy({ where: { id_menu } })
    .then(() => res.status(204).json({ message: 'Menu deletado com sucesso' }))
    .catch((err) => next(err));
};