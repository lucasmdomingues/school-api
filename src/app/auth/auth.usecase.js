import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Environment } from '../../infra/config/environment.config';

export class AuthUsecase {
  constructor(userUsecase) {
    this.userUsecase = userUsecase;
  }

  async signin(email, password) {
    const user = await this.userUsecase.findByEmail(email);

    if (!user) throw new Error('user not found');

    const match = await bcrypt.compare(password, user.password);

    if (!match) throw new Error('email and/or password is invalid');

    const { id } = user;

    const token = jwt.sign({ id, email }, Environment.token.secret, {
      expiresIn: Environment.token.expireIn,
    });

    return token;
  }
}
