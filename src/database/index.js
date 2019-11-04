import Sequelize from 'sequelize';

import {} from '';

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize()
  }
}

export default new Database();
