module.exports = (sequelize, Sequelize) => {
  const Todo = sequelize.define("todos", {
    description: {
      type: Sequelize.STRING,
    },
  });

  return Todo;
};
