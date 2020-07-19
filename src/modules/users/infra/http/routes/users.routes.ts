import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';
import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticate';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post('/', usersController.create);

usersRouter.use(ensureAuthenticate);
usersRouter.patch('/', upload.single('avatar'), userAvatarController.update);

export default usersRouter;
