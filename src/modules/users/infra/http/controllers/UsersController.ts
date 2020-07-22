import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const userService = container.resolve(CreateUserService);

    const user = await userService.execute({ name, email, password });

    delete user.password;

    return response.json(user);
  }
}