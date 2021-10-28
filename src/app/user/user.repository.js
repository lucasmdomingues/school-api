import { User } from '../../domain/user.model';

export class UserRepository {
  async store(data) {
    const user = await User.create(data);

    return user;
  }

  async list() {
    const users = await User.findAll({ order: [['id', 'DESC']] });

    return users;
  }

  async findByID(id) {
    const user = await User.findByPk(id);

    return user;
  }

  async update(user, data) {
    await user.update(data);

    return user;
  }

  async delete(id) {
    await User.destroy({ where: { id } });
  }

  async findByEmail(email) {
    const user = await User.findOne({ where: { email } });

    return user;
  }
}
