import Application from 'koa';

export const checkLogin: Application.Middleware = async (ctx, next) => {
  if (ctx.session?.currentId) {
    await next();
  } else {
    if (ctx.path === '/user/login' || ctx.path === '/user/register') {
      await next();
    } else {
      ctx.status = 200;
      ctx.body = {
        code: 99999,
        success: false,
        data: null,
        message: 'LOGIN EXPIRED',
      };
    }
  }
};
