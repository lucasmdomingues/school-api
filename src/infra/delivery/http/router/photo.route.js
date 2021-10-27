import { Router } from 'express';
import { PhotoController } from '../controller/photo.controller';
import { authMiddleware } from '../middleware/auth.middleware';

export class PhotoRouter {
  constructor(usecase) {
    this.router = new Router();
    this.controller = new PhotoController(usecase);
  }

  routes() {
    const { router, controller } = this;

    router.post('/', authMiddleware, (req, res) => controller.store(req, res));

    return router;
  }
}
