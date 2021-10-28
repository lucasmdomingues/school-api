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

  async findByID(id) {
    const student = await this.repository.findByID(id);

    return student;
  }

  async update(data, id) {
    const student = await this.findByID(id);

    if (!student) throw new Error('student not found');

    await this.repository.update(student, data);

    return student;
  }

  async delete(id) {
    const student = await this.findByID(id);

    if (!student) throw new Error('student not found');

    await this.repository.delete(id);
  }
}
