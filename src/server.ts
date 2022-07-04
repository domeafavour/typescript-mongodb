import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import KoaLogger from 'koa-logger';
import cors from 'koa2-cors';
import healthcheckRoutes from './routes/healthcheck';

const app = new Koa();

const PORT = process.env.PORT || 7645;

app.use(bodyParser());
app.use(cors({ origin: '*' }));
app.use(KoaLogger());

// use routes
app.use(healthcheckRoutes.routes());

const server = app
  .listen(PORT, async () => {
    console.log(`Server listening on port: ${PORT}`);
  })
  .on('error', (err) => {
    console.error(err);
  });

export default server;
