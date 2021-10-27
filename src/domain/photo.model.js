import Sequelize, { Model } from 'sequelize';
import { Environment } from '../infra/config/environment.config';

export class Photo extends Model {
  static init(sequelize) {
    super.init({
      original_name: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
        },
      },
      filename: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
        },
      },
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${Environment.app.url}/uploads/${this.getDataValue('filename')}`;
        },
      },
    }, {
      sequelize,
      tableName: 'photo',
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, {
      foreignKey: 'student_id',
      as: 'photos',
    });
  }
}
