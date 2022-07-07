import Router from 'koa-router';
import * as postsService from '../services/posts';

export const findAllPosts: Router.IMiddleware = async (ctx) => {
  const posts = await postsService.findAllPosts();
  ctx.status = 200;
  ctx.body = {
    status: 'success',
    data: posts,
  };
};

export const createPost: Router.IMiddleware = async (ctx) => {
  const insertedPost = await postsService.createPost(ctx.request.body);

  ctx.status = 200;
  ctx.body = {
    status: 'success',
    data: insertedPost,
  };
};

export const deletePost: Router.IMiddleware = async (ctx) => {
  const deletedPost = await postsService.deletePost(ctx.request.body.id);
  ctx.status = 200;
  ctx.body = {
    status: 'success',
    data: deletedPost,
  };
};

export const updatePost: Router.IMiddleware = async (ctx) => {
  const editedPost = await postsService.updatePost(ctx.request.body);

  ctx.status = 200;
  ctx.body = {
    status: 'success',
    data: editedPost,
  };
};

export const findPostById: Router.IMiddleware = async (ctx) => {
  const post = await postsService.findPostById(ctx.params.id);
  if (!post) {
    ctx.status = 404;
    ctx.body = {
      status: 'fail',
      data: null,
    };
  } else {
    ctx.status = 200;
    ctx.body = {
      status: 'success',
      data: post,
    };
  }
};
