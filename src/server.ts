import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cookie from 'koa-cookie';
import render from 'koa-ejs';
import KoaLogger from 'koa-logger';
import serve from 'koa-static';
import cors from 'koa2-cors';
import path from 'path';
import { config } from './config';
import connectMongoDb from './connectMongoDb';
import { checkLogin } from './middlewares/check-login';
import accountRoutes from './routes/account';
import commentsRoutes from './routes/comments';
import healthcheckRoutes from './routes/healthcheck';
import postsRoutes from './routes/posts';
import rootRoutes from './routes/root';
import usersRoutes from './routes/users';
import viewsRoutes from './routes/views';

const app = new Koa();

// https://www.npmjs.com/package/koa-ejs
render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'ejs',
  cache: false,
  // debug: true,
});

const PORT = config.port;

app.use(bodyParser());
app.use(cookie());
app.use(cors({ origin: '*' }));
app.use(KoaLogger());
app.use(serve(__dirname + '/static'));

// custom middlewares
app.use(checkLogin);

// use routes
app.use(healthcheckRoutes.routes());
app.use(usersRoutes.routes());
app.use(viewsRoutes.routes());
app.use(postsRoutes.routes());
app.use(commentsRoutes.routes());
app.use(accountRoutes.routes());
app.use(rootRoutes.routes());

connectMongoDb().catch(console.dir);

const server = app
  .listen(PORT, async () => {
    console.log(`Server listening on port: ${PORT}`);
  })
  .on('error', (err) => {
    console.error(err);
  });

export default server;
