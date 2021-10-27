import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import { resolve } from 'path';
import { AuthUsecase } from '../../../app/auth/auth.usecase';
import { StudentUsecase } from '../../../app/student/student.usecase';
import { UserRepository } from '../../../app/user/user.repository';
import { StudentRepository } from '../../../app/student/student.repository';
import { UserUsecase } from '../../../app/user/user.usecase';
import { Environment } from '../../config/environment.config';
import { errorMiddleware } from './middleware/error.middleware';
import { AuthRouter } from './router/auth.route';
import { HomeRouter } from './router/home.route';
import { UserRouter } from './router/user.route';
import { StudentRouter } from './router/student.route';
import { PhotoRouter } from './router/photo.route';
import { PhotoRepository } from '../../../app/photo/photo.repository';
import { PhotoUsecase } from '../../../app/photo/photo.usecase';

export class Http {
  constructor(port) {
    this.app = express();
    this.port = port;

    this.middlewares();
    this.router();
  }

  middlewares() {
    const { app } = this;

    app.use(morgan(Environment.app.env === 'development' ? 'dev' : 'combined'));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static(resolve(__dirname, '..', '..', '..', '..', 'public')));
  }

  router() {
    const { app } = this;

    const userRepository = new UserRepository();
    const userUsecase = new UserUsecase(userRepository);

    const authUsecase = new AuthUsecase(userUsecase);

    const studentRepository = new StudentRepository();
    const studentUsecase = new StudentUsecase(studentRepository);

    const photoRepository = new PhotoRepository();
    const photoUsecase = new PhotoUsecase(photoRepository, studentUsecase);

    const homeRouter = new HomeRouter();
    const authRouter = new AuthRouter(authUsecase);
    const userRouter = new UserRouter(userUsecase);
    const studentRouter = new StudentRouter(studentUsecase);
    const photoRouter = new PhotoRouter(photoUsecase);

    app.use('/', homeRouter.routes());
    app.use('/auth', authRouter.routes());
    app.use('/users', userRouter.routes());
    app.use('/students', studentRouter.routes());
    app.use('/photos', photoRouter.routes());
  }

  start() {
    const { port, app } = this;

    if (!port) throw new Error('http port cannot be empty');

    app.use(errorMiddleware);

    app.listen(port, () => console.log(`http server runing on port ${port}`));
  }
}
