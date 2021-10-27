import bcryptjs from 'bcryptjs';
import Sequelize, { Model } from 'sequelize';

export class User extends Model {
  static init(sequelize) {
    super.init({
      first_name: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
        },
      },
      last_name: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
      password: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
        },
      },
    }, {
      sequelize,
      tableName: 'user',
    });

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password = await bcryptjs.hash(user.password, 8);
      }
    });

    return this;
  }
}
