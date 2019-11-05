'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'students',
      [
        {
          "name": "Leonardo Oliveira de Almeida",
          "email": "leo@webid.net.br",
          "age": 20,
          "weight": 70.3,
          "height": 1.59
        },
        {
          "name": "Felipe da Silva Moraes",
          "email": "felipe.moraes1@metodista.br",
          "age": 22,
          "weight": 102.3,
          "height": 1.73
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('students', null, {});
  },
};
