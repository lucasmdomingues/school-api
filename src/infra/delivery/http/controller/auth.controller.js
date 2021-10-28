import { AppError } from '../../../../domain/error.model';

export class AuthController {
  constructor(usecase) {
    this.usecase = usecase;
  }

  async signin(req, res) {
    const { email, password } = req.body;

    try {
      if (!email) {
        throw new Error('email cannot be empty');
      }

      if (!password) {
        throw new Error('password cannot be empty');
      }

      const token = await this.usecase.signin(email, password);

      return res.json({ token });
    } catch (e) {
      if (e.message === 'email cannot be empty') {
        throw new AppError('error on signin (1.0)', e.message, 400);
      }

      if (e.message === 'password cannot be empty') {
        throw new AppError('error on signin (1.1)', e.message, 400);
      }

      if (e.message === 'user not found') {
        throw new AppError('error on signin (1.2)', e.message, 404);
      }

      if (e.message === 'email and/or password is invalid') {
        throw new AppError('error on signin (1.3)', e.message, 401);
      }

      throw new AppError('error on signin (1.4)', e.message);
    }
  }
}
