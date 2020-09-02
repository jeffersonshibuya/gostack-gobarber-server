import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const updateUserAvatar = container.resolve(UpdateUserAvatarService);

      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      });

      delete user.password;

      return response.json(classToClass(user));
    } catch (error) {
      console.log(error);
      return response.status(500).json();
    }
  }
}
