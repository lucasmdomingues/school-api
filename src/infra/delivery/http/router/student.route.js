import { Router } from 'express';
import { StudentController } from '../controller/student.controller';
import { authMiddleware } from '../middleware/auth.middleware';

export class StudentRouter {
  constructor(usecase) {
    this.router = new Router();
    this.controller = new StudentController(usecase);
  }

  routes() {
    const { router, controller } = this;

    router.get('/', authMiddleware, (req, res) => controller.list(req, res));
    router.post('/', authMiddleware, (req, res) => controller.store(req, res));
    router.get('/:id', authMiddleware, (req, res) => controller.findByID(req, res));
    router.put('/:id', authMiddleware, (req, res) => controller.update(req, res));
    router.delete('/:id', authMiddleware, (req, res) => controller.delete(req, res));

    return router;
  }
}
