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
          message: 'menu not found'
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
  const id = req.params.id;
  const { name, description, price, isAvailable } = req.body;
  menu.update({ name, description, price, isAvailable }, { where: { id } })
    .then(() => res.status(200).json({ message: 'menu updated successfully' }))
    .catch((err) => next(err));
};

exports.deleteMenu = (req, res, next) => {
  const id = req.params.id;
  menu.destroy({ where: { id } })
    .then(() => res.status(204).json({ message: 'menu deleted successfully' }))
    .catch((err) => next(err));
};