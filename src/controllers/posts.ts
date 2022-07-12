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
  try {
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
  } catch (error) {
    const err = (error as any).message;
    ctx.body = {
      code: 500,
      data: null,
      message: err,
    };
  }
};

export const deletePost: Router.IMiddleware = async (ctx) => {
  try {
    const deletedPost = await postsService.deletePost(
      ctx.request.body.id,
      ctx.session!.currentId
    );

    ctx.body = {
      code: 200,
      data: deletedPost,
      message: null,
    };
  } catch (error) {
    ctx.body = {
      code: 500,
      data: null,
      message: (error as any).message,
    };
  }
};

export const updatePost: Router.IMiddleware = async (ctx) => {
  try {
    const editedPost = await postsService.updatePost({
      ...ctx.request.body,
      author: ctx.session!.currentId,
    });

    ctx.body = {
      code: 200,
      data: editedPost,
      messgae: null,
    };
  } catch (error) {
    ctx.body = {
      code: 500,
      data: null,
      message: (error as any).message,
    };
  }
};

export const findPostById: Router.IMiddleware = async (ctx) => {
  const post = await postsService.findPostById(ctx.params.id);
  if (!post) {
    ctx.status = 404;
    ctx.body = {
      code: 502,
      status: 'fail',
      data: null,
      message: null,
    };
  } else {
    ctx.status = 200;
    ctx.body = {
      code: 200,
      status: 'success',
      data: post,
      message: null,
    };
  }
};
