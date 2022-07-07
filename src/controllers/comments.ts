import Router from 'koa-router';
import * as commentsService from './../services/comments';

export const findCommentsByPostId: Router.IMiddleware = async (ctx) => {
  const comments = await commentsService.findCommentsByPostId(
    ctx.params.postId
  );

  ctx.status = 200;
  ctx.body = {
    data: comments,
  };
};

export const createComment: Router.IMiddleware = async (ctx) => {
  const { _id } = await commentsService.createComment(ctx.request.body);

  ctx.status = 200;
  ctx.body = {
    status: 'success',
    data: _id.toString(),
  };
};

export const updateComment: Router.IMiddleware = async (ctx) => {
  const updated = await commentsService.updateComment(ctx.request.body);

  ctx.status = 200;
  ctx.body = {
    data: updated,
  };
};

export const deleteComment: Router.IMiddleware = async (ctx) => {
  const deleted = await commentsService.deleteComment(ctx.params.id);

  ctx.status = 200;
  ctx.body = {
    data: deleted,
  };
};
