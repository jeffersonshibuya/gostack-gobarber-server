import 'reflect-metadata';
import { Router } from 'express';

import ProvidersController from '../controllers/ProvidersController';

import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticate';

const providersRouter = Router();
const providersController = new ProvidersController();

providersRouter.use(ensureAuthenticate);
providersRouter.get('/', providersController.index);

export default providersRouter;
