import Router from 'koa-router';
import {
  createComment,
  deleteComment,
  findCommentsByPostId,
  updateComment,
} from '../controllers/comments';

const router = new Router({
  prefix: '/comments/',
});

router.get('list/:postId', findCommentsByPostId);
router.post('create', createComment);
router.post('update', updateComment);
router.post('delete', deleteComment);

export default router;
