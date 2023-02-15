const { menu } = require('../models/menu');

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
  const { id, title, type, icon, link, id_sistema, has_sub_menu, parent_id, ordem } = req.body;
  menu.create({
    id,
    title,
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
  const { id, title, type, icon, link, id_sistema, has_sub_menu, parent_id, ordem } = req.body;

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