import { AppError } from '../../../../domain/error.model';

export class StudentController {
  constructor(usecase) {
    this.usecase = usecase;
  }

  async store(req, res) {
    try {
      const student = await this.usecase.store(req.body);

      return res.status(201).json(student);
    } catch (e) {
      if (e.errors) {
        throw new AppError('error on store student (1.0)', e.errors.map((err) => err.message), 400);
      }

      throw new AppError('error on store student (1.1)', e.message);
    }
  }

  async index(req, res) {
    try {
      const students = await this.usecase.list();

      return res.json(students);
    } catch (e) {
      throw new AppError('error on list students', e.message);
    }
  }

  async show(req, res) {
    const { id } = req.params;

    if (!id) {
      throw new Error('student id cannot be empty');
    }

    try {
      const student = await this.usecase.show(id);

      if (!student) {
        throw new Error('student not found');
      }

      return res.json(student);
    } catch (e) {
      if (e.message === 'student id cannot be empty') {
        throw new AppError('error on show student (1.0)', e.message, 400);
      }

      if (e.message === 'student not found') {
        throw new AppError('error on show student (1.1)', e.message, 404);
      }

      throw new AppError('error on show student (1.2)', e.message);
    }
  }

  async put(req, res) {
    const { id } = req.params;

    if (!id) {
      throw new Error('student id cannot be empty');
    }

    try {
      const student = await this.usecase.put(req.body, id);

      return res.json(student);
    } catch (e) {
      if (e.message === 'student id cannot be empty') {
        throw new AppError('error on put student (1.0)', e.message, 400);
      }

      if (e.message === 'student not found') {
        throw new AppError('error on put student (1.1)', e.message, 404);
      }

      throw new AppError('error on put student (1.2)', e.message);
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    if (!id) {
      throw new Error('student id cannot be empty');
    }

    try {
      await this.usecase.delete(id);

      return res.status(204).send();
    } catch (e) {
      if (e.message === 'student id cannot be empty') {
        throw new AppError('error on put student (1.0)', e.message, 400);
      }

      if (e.message === 'student not found') {
        throw new AppError('error on delete student (1.1)', e.message, 404);
      }

      throw new AppError('error on delete student (1.2)', e.message);
    }
  }
}
