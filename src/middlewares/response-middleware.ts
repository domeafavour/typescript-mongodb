import Koa from 'koa';

export const responseMiddleware: Koa.Middleware = async (ctx, next) => {
  await next();
  if (!ctx.url.match(/^\/views/)) {
    if (ctx.body.status === 'success') {
      ctx.body.success = true;
    } else {
      ctx.body.success = false;
    }
  }
};
