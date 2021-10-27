import Sequelize, { Model } from 'sequelize';

export class Student extends Model {
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
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
      age: {
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: true,
          isInt: true,
        },
      },
    }, {
      sequelize,
      tableName: 'student',
    });

    return this;
  }

  static associate(models) {
    this.hasMany(models.Photo, {
      foreignKey: 'student_id',
      as: 'photos',
    });
  }
}
