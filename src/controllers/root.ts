import Router from 'koa-router';
import * as postsService from '../services/posts';

export const renderPosts: Router.IMiddleware = async (ctx) => {
  const posts = await postsService.findAllPosts();
  await ctx.render('posts', {
    title: 'Posts',
    posts,
  });
};
