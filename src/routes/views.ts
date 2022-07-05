import Router from 'koa-router';
import { findAll, findPost } from '../controllers/posts';

const router = new Router({
  prefix: '/views/',
});

router.get('posts', async (ctx) => {
  const posts = await findAll();

  await ctx.render('posts', {
    title: 'Posts',
    posts,
  });
});

router.get('posts/:id', async (ctx) => {
  const post = await findPost(ctx.params.id);

  await ctx.render('post-detail', {
    title: post?.title,
    post,
  });
});

export default router;
