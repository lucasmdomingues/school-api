import multer from 'multer';
import { multerConfig } from '../../../config/multer.config';

export class PhotoController {
  constructor(usecase) {
    this.upload = multer(multerConfig).single('photo');
    this.usecase = usecase;
  }

  store(req, res) {
    this.upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          message: 'error on upload file (1.0)',
          details: [err.message],
        });
      }

      const { file, body } = req;

      try {
        const photo = await this.usecase.store(file, body.student_id);

        return res.json(photo);
      } catch (e) {
        if (e.message === 'student not found') {
          return res.status(404).json({
            message: 'error on upload file (1.1)',
            details: [e.message],
          });
        }

        return res.status(500).json({
          message: 'error on upload file (1.2)',
          details: [e.message],
        });
      }
    });
  }
}
