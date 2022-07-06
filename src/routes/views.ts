import Router from 'koa-router';
import { findAll, findPost } from '../controllers/posts';
import { findUserById, findUsersByPage } from '../controllers/users';

const router = new Router({
  prefix: '/views/',
});

router.get('login', async (ctx) => {
  const { error, email } = ctx.query;
  await ctx.render('login', {
    title: 'LOGIN',
    error,
    email,
  });
});

router.get('register', async (ctx) => {
  await ctx.render('register', {
    title: 'REGISTER',
  });
});

router.get('welcome', async (ctx) => {
  const user = await findUserById(ctx.cookie.id);
  if (user) {
    await ctx.render('welcome', {
      title: 'WELCOME',
      name: user.name,
    });
  } else {
    ctx.redirect('/views/login?error=EXPIRED');
  }
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
