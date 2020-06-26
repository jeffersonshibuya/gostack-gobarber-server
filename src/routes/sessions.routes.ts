import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authUserService = new AuthenticateUserService();

  const { user, token } = await authUserService.execute({
    email,
    password,
  });

  delete user.password;

  response.send({ user, token });
});

export default sessionsRouter;
