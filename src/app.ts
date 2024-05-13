import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import swaggerUI from 'swagger-ui-express';
import { errorHandler } from './middlewares/error-handler';
import { RegisterRoutes } from './routes/routes';
import swaggerFile from './swagger.json';
import dotenv from 'dotenv'
import bodyParser from 'body-parser';

const app: express.Application = express();
dotenv.config()
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}))
RegisterRoutes(app);

app.use(
  '/docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerFile)
);

app.get('/health', (req, res) => res.send('OK'));

app.use(function notFoundHandler(_req, res) {
  res.status(404).send('Not Found');
});

app.use(errorHandler);

export default app;
