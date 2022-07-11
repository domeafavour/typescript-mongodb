import Router from 'koa-router';
import * as commentsService from './../services/comments';

export const findCommentsByPostId: Router.IMiddleware = async (ctx) => {
  const comments = await commentsService.findCommentsByPostId(
    ctx.params.postId
  );

  ctx.status = 200;
  ctx.body = {
    code: 200,
    message: null,
    data: comments,
  };
};

export const createComment: Router.IMiddleware = async (ctx) => {
  const { _id } = await commentsService.createComment({
    ...ctx.request.body,
    userId: ctx.session!.currentId,
  });

  ctx.status = 200;
  ctx.body = {
    code: 200,
    status: 'success',
    data: _id.toString(),
    message: null,
  };
};

export const updateComment: Router.IMiddleware = async (ctx) => {
  const updated = await commentsService.updateComment({
    ...ctx.request.body,
    userId: ctx.session!.currentId,
  });

  ctx.status = 200;
  ctx.body = {
    code: 200,
    message: null,
    data: updated,
  };
};

export const deleteComment: Router.IMiddleware = async (ctx) => {
  const deleted = await commentsService.deleteComment(ctx.request.body.id);

  ctx.status = 200;
  ctx.body = {
    data: deleted,
    code: 200,
    message: null,
  };
};
