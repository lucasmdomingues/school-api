import { Router } from 'express';
import { UserController } from '../controller/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';

export class UserRouter {
  constructor(usecase) {
    this.router = new Router();
    this.controller = new UserController(usecase);
  }

  routes() {
    const { router, controller } = this;

    router.post('/', (req, res) => controller.store(req, res));
    router.get('/', authMiddleware, (req, res) => controller.index(req, res));
    router.get('/:id', authMiddleware, (req, res) => controller.show(req, res));
    router.put('/', authMiddleware, (req, res) => controller.put(req, res));
    router.delete('/', authMiddleware, (req, res) => controller.delete(req, res));

    return router;
  }
}
