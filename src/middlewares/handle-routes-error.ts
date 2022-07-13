import Router from 'koa-router';

export function handleRoutesError(middleware: Router.IMiddleware) {
  return (async (ctx, next) => {
    try {
      await middleware(ctx, next);
    } catch (error) {
      ctx.body = {
        code: 500,
        data: null,
        message: (error as any).message,
      };
    }
  }) as Router.IMiddleware;
}
