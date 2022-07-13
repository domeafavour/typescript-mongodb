import Router from 'koa-router';
import * as postsService from '../services/posts';

export const findAllPosts: Router.IMiddleware = async (ctx) => {
  const posts = await postsService.findAllPosts();
  ctx.status = 200;
  ctx.body = {
    code: 200,
    message: null,
    status: 'success',
    data: posts,
  };
};

export const createPost: Router.IMiddleware = async (ctx) => {
  const insertedPost = await postsService.createPost({
    ...ctx.request.body,
    author: ctx.session!.currentId,
  });

  ctx.body = {
    code: 200,
    status: 'success',
    data: insertedPost,
    message: null,
  };
};

export const deletePost: Router.IMiddleware = async (ctx) => {
  const deletedPost = await postsService.deletePost(
    ctx.request.body.id,
    ctx.session!.currentId
  );

  ctx.body = {
    code: 200,
    data: deletedPost,
    message: null,
  };
};

export const updatePost: Router.IMiddleware = async (ctx) => {
  const editedPost = await postsService.updatePost({
    ...ctx.request.body,
    author: ctx.session!.currentId,
  });

  ctx.body = {
    code: 200,
    data: editedPost,
    messgae: null,
  };
};

export const findPostById: Router.IMiddleware = async (ctx) => {
  const post = await postsService.findPostById(ctx.params.id);
  ctx.body = {
    code: 200,
    status: 'success',
    data: post,
    message: null,
  };
};
