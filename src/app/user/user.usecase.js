export class UserUsecase {
  constructor(repository) {
    this.repository = repository;
  }

  async list() {
    const users = await this.repository.list();

    return users;
  }

  async store(data) {
    const user = await this.repository.store(data);

    return user;
  }

  async show(id) {
    const user = await this.repository.show(id);

    return user;
  }

  async put(data, id) {
    const user = await this.show(id);

    if (!user) throw new Error('user not found');

    await this.repository.put(user, data);

    return user;
  }

  async delete(id) {
    const user = await this.show(id);

    if (!user) throw new Error('user not found');

    await this.repository.delete(id);
  }

  async findByEmail(email) {
    const user = await this.repository.findByEmail(email);

    return user;
  }
}
