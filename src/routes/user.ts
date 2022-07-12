import Router from 'koa-router';
import {
  fetchCurrent,
  fetchUser,
  login,
  register,
  updateCurrent,
} from '../controllers/user';

const router = new Router({
  prefix: '/user/',
});

router.post('login', login);
router.post('register', register);
router.get('current', fetchCurrent);
router.post('update', updateCurrent);
router.get(':id', fetchUser);

export default router;
