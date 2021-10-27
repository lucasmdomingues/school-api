import { Sequelize } from 'sequelize';
import { Photo } from '../../../domain/photo.model';
import { Student } from '../../../domain/student.model';
import { User } from '../../../domain/user.model';
import config from '../../config/sequelize.config';

const connection = new Sequelize(config);
const models = [Student, User, Photo];

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
