import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cookie from 'koa-cookie';
import render from 'koa-ejs';
import KoaLogger from 'koa-logger';
import session from 'koa-session';
import serve from 'koa-static';
import cors from 'koa2-cors';
import path from 'path';
import { config } from './config';
import connectMongoDb from './connectMongoDb';
import { checkLogin } from './middlewares/check-login';
import commentsRoutes from './routes/comments';
import postsRoutes from './routes/posts';
import userRoutes from './routes/user';

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

app.use(session(app));
app.keys = ['session'];
app.use(bodyParser());
app.use(cookie());
app.use(cors({ origin: '*' }));
app.use(KoaLogger());
app.use(serve(__dirname + '/static'));

app.use(checkLogin);

// use routes
app.use(postsRoutes.routes());
app.use(commentsRoutes.routes());
app.use(userRoutes.routes());

connectMongoDb().catch(console.dir);

const server = app
  .listen(PORT, async () => {
    console.log(`Server listening on port: ${PORT}`);
  })
  .on('error', (err) => {
    console.error(err);
  });

export default server;
