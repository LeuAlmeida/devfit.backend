module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('help_orders', { id: Sequelize.INTEGER });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('help_orders');
  },
};
