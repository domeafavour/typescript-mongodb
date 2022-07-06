import Application from 'koa';

export const checkLogin: Application.Middleware = async (ctx, next) => {
  if (ctx.cookie.id) {
    await next();
  } else {
    if (ctx.url !== '/views/login') {
      ctx.redirect('/views/login');
      await next();
    } else {
      await next();
    }
  }
};
