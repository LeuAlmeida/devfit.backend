module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('checkins', { id: Sequelize.INTEGER });
  },

  down: queryInterface => {
    return queryInterface.dropTable('checkins');
  },
};
