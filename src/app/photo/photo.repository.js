import { Photo } from '../../domain/photo.model';

export class PhotoRepository {
  async store(originalName, filename, studentID) {
    const photo = await Photo.create({
      original_name: originalName,
      filename,
      student_id: studentID,
    });

    return photo;
  }
}
