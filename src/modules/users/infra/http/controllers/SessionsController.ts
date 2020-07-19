import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async authenticate(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const authUserService = container.resolve(AuthenticateUserService);
    const { email, password } = request.body;

    const { user, token } = await authUserService.execute({
      email,
      password,
    });

    delete user.password;

    return response.send({ user, token });
  }
}
