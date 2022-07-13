import Koa from 'koa';
import cookie from 'koa-cookie';
import KoaLogger from 'koa-logger';
import session from 'koa-session';
import serve from 'koa-static';
import cors from 'koa2-cors';
import { config } from './config';
import connectMongoDb from './connectMongoDb';
import { bodyParser } from './middlewares/body-parser';
import { checkLogin } from './middlewares/check-login';
import { handleRoutesError } from './middlewares/handle-routes-error';
import { withoutPrefix } from './middlewares/without-prefix';
import * as allRoutes from './routes';

const app = new Koa();

const PORT = config.port;

app.use(session(app));
app.keys = ['session'];
app.use(cookie());
app.use(cors({ origin: '*' }));
app.use(KoaLogger());
app.use(serve(__dirname + '/static'));

app.use(withoutPrefix('/api'));
app.use(checkLogin);

app.use(bodyParser);

// use routes
Object.values(allRoutes).forEach((routes) => {
  app.use(handleRoutesError(routes.routes()));
});

connectMongoDb().catch(console.dir);

const server = app
  .listen(PORT, async () => {
    console.log(`Server listening on port: ${PORT}`);
  })
  .on('error', (err) => {
    console.error(err);
  });

export default server;
