import Router from 'koa-router';
import { createPost, deletePost, updatePost } from '../controllers/posts';

const router = new Router({
  prefix: '/posts/',
});

router.post('add', async (ctx) => {
  const insertedPost = await createPost(ctx.request.body);

  ctx.status = 200;
  ctx.body = {
    status: 'success',
    data: insertedPost,
  };
});

router.post('edit', async (ctx) => {
  const editedPost = await updatePost(ctx.request.body);

  ctx.status = 200;
  ctx.body = {
    status: 'success',
    data: editedPost,
  };
});

router.post('delete', async (ctx) => {
  const { deletedCount } = await deletePost(ctx.request.body.id);
  if (deletedCount) {
    ctx.status = 200;
    ctx.body = {
      status: 'success',
      data: null,
    };
  } else {
    ctx.status = 500;
    ctx.body = {
      status: 'fail',
      data: null,
    };
  }
});

export default router;
