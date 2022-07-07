import Router from 'koa-router';
import {
  createPost,
  deletePost,
  findAllPosts,
  findPostById,
  updatePost,
} from '../controllers/posts';

const router = new Router({
  prefix: '/posts/',
});

router.get('list', findAllPosts);
router.get(':id', findPostById);
router.post('create', createPost);
router.post('update', updatePost);
router.post('delete', deletePost);

export default router;
