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
      const { message, errors } = e;

      if (errors) {
        throw new AppError('error on store student (1.0)', errors.map((err) => err.message), 400);
      }

      throw new AppError('error on store student (1.1)', message);
    }
  }

  async list(req, res) {
    try {
      const students = await this.usecase.list();

      return res.json(students);
    } catch (e) {
      throw new AppError('error on list students', e.message);
    }
  }

  async findByID(req, res) {
    const { id } = req.params;

    try {
      if (!id || isNaN(id)) {
        throw new Error('student id cannot be empty');
      }

      const student = await this.usecase.findByID(id);

      if (!student) {
        throw new Error('student not found');
      }

      return res.json(student);
    } catch (e) {
      const { message } = e;

      if (message === 'student id cannot be empty') {
        throw new AppError('error on find student by id (1.0)', message, 400);
      }

      if (message === 'student not found') {
        throw new AppError('error on find student by id (1.1)', message, 404);
      }

      throw new AppError('error on find student by id (1.2)', message);
    }
  }

  async update(req, res) {
    const { id } = req.params;

    try {
      if (!id || isNaN(id)) {
        throw new Error('student id cannot be empty');
      }

      const student = await this.usecase.update(req.body, id);

      return res.json(student);
    } catch (e) {
      const { message } = e;

      if (message === 'student id cannot be empty') {
        throw new AppError('error on update student (1.0)', message, 400);
      }

      if (message === 'student not found') {
        throw new AppError('error on update student (1.1)', message, 404);
      }

      throw new AppError('error on update student (1.2)', message);
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      if (!id || isNaN(id)) {
        throw new Error('student id cannot be empty');
      }

      await this.usecase.delete(id);

      return res.status(204).send();
    } catch (e) {
      const { message } = e;

      if (message === 'student id cannot be empty') {
        throw new AppError('error on delete student (1.0)', message, 400);
      }

      if (message === 'student not found') {
        throw new AppError('error on delete student (1.1)', message, 404);
      }

      throw new AppError('error on delete student (1.2)', message);
    }
  }
}
