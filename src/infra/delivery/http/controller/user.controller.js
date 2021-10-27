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
      if (e.errors) {
        throw new AppError('error on store user (1.0)', e.errors.map((err) => err.message), 400);
      }

      throw new AppError('error on store user (1.1)', e.message);
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

  async show(req, res) {
    const { id } = req.params;

    if (!id) {
      throw new Error('user id cannot be empty');
    }

    try {
      const user = await this.usecase.show(id);

      if (!user) {
        throw new Error('user not found');
      }

      return res.json(user);
    } catch (e) {
      if (e.message === 'user id cannot be empty') {
        return AppError('error on put user (1.0)', e.message, 400);
      }

      if (e.message === 'user not found') {
        throw new AppError('error on put user (1.1)', e.message, 404);
      }

      throw new AppError('error on show user (1.2)', e.message);
    }
  }

  async put(req, res) {
    const { id } = req.user;

    if (!id) {
      throw new Error('user id cannot be empty');
    }

    try {
      const user = await this.usecase.put(req.body, id);

      return res.json(user);
    } catch (e) {
      if (e.message === 'user id cannot be empty') {
        throw new AppError('error on put user (1.0)', e.message, 400);
      }

      if (e.message === 'user not found') {
        throw new AppError('error on put user (1.1)', e.message, 404);
      }

      throw new AppError('error on put user (1.2)', e.message);
    }
  }

  async delete(req, res) {
    const { id } = req.user;

    if (!id) {
      throw new Error('user id cannot be empty');
    }

    try {
      await this.usecase.delete(id);

      return res.status(204).send();
    } catch (e) {
      if (e.message === 'user id cannot be empty') {
        throw new AppError('error on put user (1.0)', e.message, 400);
      }

      if (e.message === 'user not found') {
        throw new AppError('error on delete user (1.1)', e.message, 404);
      }

      throw new AppError('error on delete user (1.2)', e.message);
    }
  }
}
