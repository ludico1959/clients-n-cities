import 'reflect-metadata';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../swagger.json';
import connection from '../infra/database';
import { router } from '../routes';

const app = express();

app.use(express.json());

connection();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

export { app };
