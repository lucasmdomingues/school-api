export class StudentUsecase {
  constructor(repository) {
    this.repository = repository;
  }

  async list() {
    const students = await this.repository.list();

    return students;
  }

  async store(data) {
    const student = await this.repository.store(data);

    return student;
  }

  async show(id) {
    const student = await this.repository.show(id);

    return student;
  }

  async put(data, id) {
    const student = await this.show(id);

    if (!student) throw new Error('student not found');

    await this.repository.put(student, data);

    return student;
  }

  async delete(id) {
    const student = await this.show(id);

    if (!student) throw new Error('student not found');

    await this.repository.delete(id);
  }
}
