const bcrypt = require('bcryptjs');

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Administrador',
          email: 'admin@gympoint.com',
          password_hash: bcrypt.hashSync('admin', 5),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Leonardo Almeida',
          email: 'leo@webid.net.br',
          password_hash: bcrypt.hashSync('admin', 5),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
