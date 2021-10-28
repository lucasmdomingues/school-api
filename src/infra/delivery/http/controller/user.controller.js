import { AppError } from '../../../../domain/error.model';

export class UserController {
  constructor(usecase) {
    this.usecase = usecase;
  }

  async store(req, res) {
    try {
      const user = await this.usecase.store(req.body);

      return res.status(201).json(user);
    } catch (e) {
      const { message, errors } = e;

      if (message === 'user already exists') {
        throw new AppError('error on store user (1.0)', message, 400);
      }

      if (errors) {
        throw new AppError('error on store user (1.1)', errors.map((err) => err.message), 400);
      }

      throw new AppError('error on store user (1.2)', message);
    }
  }

  async index(req, res) {
    try {
      const users = await this.usecase.list();

      return res.json(users);
    } catch (e) {
      throw new AppError('error on list users', e.message);
    }
  }

  async findByID(req, res) {
    const { id } = req.user;

    try {
      if (!id || isNaN(id)) {
        throw new Error('user id cannot be empty');
      }

      const user = await this.usecase.findByID(id);

      if (!user) {
        throw new Error('user not found');
      }

      return res.json(user);
    } catch (e) {
      const { message } = e;

      if (message === 'user id cannot be empty') {
        return AppError('error on find user by id (1.0)', message, 400);
      }

      if (message === 'user not found') {
        throw new AppError('error on find user by id (1.1)', message, 404);
      }

      throw new AppError('error on find user by id (1.2)', message);
    }
  }

  async update(req, res) {
    const { id } = req.user;

    try {
      if (!id || isNaN(id)) {
        throw new Error('user id cannot be empty');
      }

      const user = await this.usecase.update(req.body, id);

      return res.json(user);
    } catch (e) {
      const { message } = e;

      if (message === 'user id cannot be empty') {
        throw new AppError('error on update user (1.0)', message, 400);
      }

      if (message === 'user not found') {
        throw new AppError('error on update user (1.1)', message, 404);
      }

      throw new AppError('error on update user (1.2)', message);
    }
  }

  async delete(req, res) {
    const { id } = req.user;

    try {
      if (!id || isNaN(id)) {
        throw new Error('user id cannot be empty');
      }

      await this.usecase.delete(id);

      return res.status(204).send();
    } catch (e) {
      const { message } = e;

      if (message === 'user id cannot be empty') {
        throw new AppError('error on delete user (1.0)', message, 400);
      }

      if (message === 'user not found') {
        throw new AppError('error on delete user (1.1)', message, 404);
      }

      throw new AppError('error on delete user (1.2)', message);
    }
  }
}
