import Router from 'koa-router';
import { addComment } from '../controllers/comments';

const router = new Router({
  prefix: '/comments/',
});

router.post('add', async (ctx) => {
  const { insertedId } = await addComment(ctx.request.body);

  ctx.status = 200;
  ctx.body = {
    status: 'success',
    data: insertedId.toString(),
  };
});

export default router;
