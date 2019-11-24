module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'plans',
      [
        {
          id: 1,
          title: 'Start',
          price: 129,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          title: 'Gold',
          price: 109,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          title: 'Diamond',
          price: 89,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('plans', null, {});
  },
};
