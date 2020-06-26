import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';
import { getRepository } from 'typeorm';
import multer from 'multer';

import User from '../models/User';
import ensureAuthenticate from '../middlewares/ensureAuthenticate';
import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.get('/', async (request, response) => {
  const userRepository = getRepository(User);

  const users = await userRepository.find();

  return response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const userService = new CreateUserService();

  const user = await userService.execute({ name, email, password });

  delete user.password;

  return response.json(user);
});

usersRouter.use(ensureAuthenticate);
usersRouter.patch('/', upload.single('avatar'), async (request, response) => {
  const updateUserAvatar = new UpdateUserAvatarService();

  const user = await updateUserAvatar.execute({
    user_id: request.user.id,
    avatarFilename: request.file.filename,
  });

  delete user.password;

  return response.json(user);
});

export default usersRouter;
