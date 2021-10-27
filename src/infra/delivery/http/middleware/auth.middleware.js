import jwt from 'jsonwebtoken';
import { AppError } from '../../../../domain/error.model';
import { User } from '../../../../domain/user.model';
import { Environment } from '../../../config/environment.config';

export const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      throw new Error('token cannot be empty');
    }

    const [, token] = authorization.split(' ');

    const data = jwt.verify(token, Environment.token.secret);

    const { id, email } = data;

    const user = await User.findOne({ where: { id, email } });

    if (!user) {
      throw new Error('user not found');
    }

    req.user = { id, email };

    return next();
  } catch (e) {
    const { message } = e;

    if (message === 'user not found') {
      throw new AppError('error on parse token (1.0)', message, 404);
    }

    if (message === 'token cannot be empty') {
      throw new AppError('error on parse token (1.1)', message, 401);
    }

    throw new AppError('error on parse token (1.2)', message, 401);
  }
};
