import { Router } from 'express';
import { AuthController } from '../controller/auth.controller';

export class AuthRouter {
  constructor(usecase) {
    this.router = new Router();
    this.controller = new AuthController(usecase);
  }

  routes() {
    const { router, controller } = this;

    router.post('/signin', (req, res) => controller.signin(req, res));

    return router;
  }
}
