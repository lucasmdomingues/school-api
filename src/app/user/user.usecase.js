export class UserUsecase {
  constructor(repository) {
    this.repository = repository;
  }

  async list() {
    const users = await this.repository.list();

    return users;
  }

  async store(data) {
    const userAlreadyExists = await this.findByEmail(data.email);

    if (userAlreadyExists) throw new Error('user already exists');

    const user = await this.repository.store(data);

    return user;
  }

  async findByID(id) {
    const user = await this.repository.findByID(id);

    return user;
  }

  async update(data, id) {
    const user = await this.findByID(id);

    if (!user) throw new Error('user not found');

    if (user.email !== data.email) {
      const userAlreadyExists = await this.findByEmail(data.email);

      if (userAlreadyExists) throw new Error('user already exists');
    }

    await this.repository.update(user, data);

    return user;
  }

  async delete(id) {
    const user = await this.findByID(id);

    if (!user) throw new Error('user not found');

    await this.repository.delete(id);
  }

  async findByEmail(email) {
    const user = await this.repository.findByEmail(email);

    return user;
  }
}
