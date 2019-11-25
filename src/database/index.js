import Sequelize from 'sequelize';

import User from '../app/models/User';
import Student from '../app/models/Student';
import Plans from '../app/models/Plans';

import databaseConfig from '../config/database';

const models = [User, Student, Plans];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
