import Router from 'koa-router';
import { findAll, findPost } from '../controllers/posts';
import { findUsersByPage } from '../controllers/users';

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

  if (!post) {
    return await ctx.render('404', {
      title: 'Page Not Found',
    });
  }

  const users = await findUsersByPage({ page: 1, size: 10 });

  await ctx.render('post-detail', {
    title: post?.title,
    post,
    users: users.data,
  });
});

router.get('add-post', async (ctx) => {
  const users = await findUsersByPage({ page: 1, size: 10 });
  await ctx.render('add-post', {
    title: 'Add Post',
    users: users.data,
  });
});

router.get('edit-post/:id', async (ctx) => {
  const post = await findPost(ctx.params.id);

  if (!post) {
    return await ctx.render('404', {
      title: 'Page Not Found',
    });
  }

  const users = await findUsersByPage({ page: 1, size: 10 });
  await ctx.render('edit-post', {
    title: 'Edit - ' + post?.title,
    post,
    users: users.data,
  });
});

export default router;
