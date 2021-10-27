import { Router } from 'express';
import { HomeController } from '../controller/home.controller';

export class HomeRouter {
  constructor() {
    this.router = new Router();
    this.controller = new HomeController();
  }

  routes() {
    const { router, controller } = this;

    router.get('/', controller.index);

    return router;
  }
}
