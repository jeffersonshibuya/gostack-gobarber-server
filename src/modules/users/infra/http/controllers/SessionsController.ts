import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

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

    return response.send({ user: classToClass(user), token });
  }
}
