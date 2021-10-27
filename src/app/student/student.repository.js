import { Photo } from '../../domain/photo.model';
import { Student } from '../../domain/student.model';

export class StudentRepository {
  async store(data) {
    const student = await Student.create(data);

    return student;
  }

  async list() {
    const students = await Student.findAll({
      include: {
        model: Photo,
        as: 'photos',
        attributes: ['filename', 'url'],
      },
      order: [['id', 'DESC']],
    });

    return students;
  }

  async show(id) {
    const student = await Student.findByPk(id, {
      include: {
        model: Photo,
        as: 'photos',
        attributes: ['filename', 'url'],
      },
    });

    return student;
  }

  async put(student, data) {
    await student.update(data);

    return student;
  }

  async delete(id) {
    await Student.destroy({ where: { id } });
  }
}
