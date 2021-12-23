const db = require("../models");
const Todo = db.todos;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.description) {
    res.status(400).send({
      message: "Description can not be empty",
    });
  }

  const todo = {
    description: req.body.description,
  };

  Todo.create(todo)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while creating the todo",
      });
    });
};

exports.findAll = (req, res) => {
  const description = req.query.description;
  var condition = description
    ? { description: { [Op.description]: `%${description}%` } }
    : null;

  Todo.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Some error occurred while retrieving todos`,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Todo.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating todo with id=${id}`,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Todo.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Todo was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update todo with id:${id}. Maybe Todo was not found or req.body is empty`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating todo with id=${id}`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Todo.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Todo was deleted successfully.",
        });
      } else {
        res.send({
          message: `Cannot delete todo with id:${id}. Maybe Todo was not found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error delete todo with id=${id}`,
      });
    });
};

exports.deleteAll = (req, res) => {
  Todo.destroy({ where: {}, truncate: false })
    .then((nums) => {
      res.send({
        message: `${nums} Todos were deleted successfully.`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Some error occurred while removing all todos.`,
      });
    });
};
