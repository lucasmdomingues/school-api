export class PhotoUsecase {
  constructor(repository, studentUsecase) {
    this.repository = repository;
    this.studentUsecase = studentUsecase;
  }

  async store(file, studentID) {
    const student = await this.studentUsecase.show(studentID);

    if (!student) throw new Error('student not found');

    const { originalname, filename } = file;

    const photo = await this.repository.store(originalname, filename, studentID);

    return photo;
  }
}
