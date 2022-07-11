import Application from 'koa';

export const withoutPrefix = (prefix: string) => {
  return (async (ctx, next) => {
    if (ctx.path.startsWith(prefix)) {
      ctx.path = ctx.path.replace(new RegExp(`^${prefix}`), '');
    }
    await next();
  }) as Application.Middleware;
};
