import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import KoaLogger from 'koa-logger';
import cors from 'koa2-cors';
import serve from 'koa-static';
import { config } from './config';
import connectMongoDb from './connectMongoDb';
import healthcheckRoutes from './routes/healthcheck';
import usersRoutes from './routes/users';

const app = new Koa();

const PORT = config.port;

app.use(bodyParser());
app.use(cors({ origin: '*' }));
app.use(KoaLogger());
app.use(serve(__dirname + '/static'));

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
