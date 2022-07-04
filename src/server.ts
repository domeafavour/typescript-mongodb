import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import KoaLogger from 'koa-logger';
import cors from 'koa2-cors';
import { config } from './config';
import connectMongoDb from './connectMongoDb';
import healthcheckRoutes from './routes/healthcheck';
import usersRoutes from './routes/users';

const app = new Koa();

const PORT = config.port;

app.use(bodyParser());
app.use(cors({ origin: '*' }));
app.use(KoaLogger());

// use routes
app.use(healthcheckRoutes.routes());
app.use(usersRoutes.routes());

connectMongoDb().catch(console.dir);

const server = app
  .listen(PORT, async () => {
    console.log(`Server listening on port: ${PORT}`);
  })
  .on('error', (err) => {
    console.error(err);
  });

export default server;
