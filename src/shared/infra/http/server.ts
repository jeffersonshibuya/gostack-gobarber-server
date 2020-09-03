import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';

import routes from './routes';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import ratelimiter from './middlewares/rateLimiter';

import '@shared/infra/typeorm';
import '@shared/container';

import * as Sentry from '@sentry/node';

const app = express();

Sentry.init({
  dsn:
    'https://f469e21828d44d29a5cc3e2979f450c2@o442611.ingest.sentry.io/5416497',
});
app.use(Sentry.Handlers.requestHandler() as express.RequestHandler);

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(ratelimiter);
app.use(routes);
app.use(errors());

app.get('/debug-sentry', function mainHandler(req, res) {
  throw new Error('My first Sentry error!');
});

// Global errors interceptor
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    Sentry.captureException(err.message);
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.use(Sentry.Handlers.errorHandler() as express.ErrorRequestHandler);

app.listen(3333, () => {
  console.log('🚀 App running on port 3333');
});
