import Router from 'koa-router';

const router = new Router();

router.get('/', async (ctx, next) => {
  await next();
  console.log('root', ctx);
});

export default router;
